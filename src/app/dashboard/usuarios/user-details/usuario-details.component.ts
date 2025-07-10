// user-details.component.ts (Contexto completo del componente)
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { RoleUserService } from 'src/app/services/role-user.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  form!: FormGroup;
  userId!: number;
  allRoles: any[] = [];
  userRoles: number[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private rolesService: RolesService,
    private roleUserService: RoleUserService
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      name: [''],
      email: [''],
      active: [true]
    });

    this.loadUser();
    this.loadRoles();
    this.loadUserRoles();
  }

  loadUser() {
    this.usersService.getById(this.userId).subscribe(user => {
      this.form.patchValue({
        name: user.name,
        email: user.email,
        active: user.active === '1' || user.active === true
      });
    });
  }

  loadRoles() {
    this.rolesService.get().subscribe(roles => {
      this.allRoles = roles;
    });
  }

  loadUserRoles() {
    this.roleUserService.getByUserId(this.userId).subscribe(response => {
      this.userRoles = response.map((r: any) => r.role_id);
    });
  }

  toggleRole(roleId: number, isChecked: boolean) {
    if (isChecked && !this.userRoles.includes(roleId)) {
      this.roleUserService.create({ user_id: this.userId, role_id: roleId }).subscribe();
      this.userRoles.push(roleId);
    } else if (!isChecked && this.userRoles.includes(roleId)) {
      this.roleUserService.deleteByUserIdAndRoleId(this.userId, roleId).subscribe();
      this.userRoles = this.userRoles.filter(id => id !== roleId);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
      active: this.form.value.active ? 1 : 0
    };

    this.usersService.update(this.userId, payload).subscribe({
      next: () => alert('Usuario actualizado correctamente'),
      error: (err) => console.error('Error al actualizar:', err)
    });
  }
}
