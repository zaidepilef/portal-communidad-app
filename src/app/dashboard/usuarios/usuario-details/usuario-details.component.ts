/* eslint-disable @typescript-eslint/no-explicit-any */
// angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user-model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { Role } from 'src/app/models/roles-model';


@Component({
	selector: 'app-usuario-details',
	imports: [CommonModule, ReactiveFormsModule, RouterModule],
	templateUrl: './usuario-details.component.html',
	styleUrls: ['./usuario-details.component.scss']
})
export class UsuarioDetailsComponent implements OnInit {

	userID!: number;
	user!: User;
	userForm!: FormGroup;
	roles: Role[];

	constructor(
		private route: ActivatedRoute,
		private userService: UsersService,
		private rolesService: RolesService,
		private fb: FormBuilder) {
	}

	ngOnInit() {
		this.userID = +this.route.snapshot.paramMap.get('id')!;
		this.userForm = this.fb.group({
			username: [''],
			email: [''],
			status: ['']
		});
		this.loadUser();
		this.loadRoles();
	}

	loadUser() {
		this.userService.getById(this.userID).subscribe((data: User) => {
			this.userForm.patchValue(data);
		});
	}

	/*
	loadUser() {
		this.userService.getById(this.userID).subscribe({
			next: (data) => { this.user = data; this.userForm.patchValue(data);},
			error: (err) => console.error('Error al obtener usuario:', err)
		});
	}
	*/

	loadRoles() {
		this.rolesService.get().subscribe(data => this.roles = data);
	}



	onSubmit() {
		if (this.userForm.invalid) return;

		const updatedUser = {
			name: this.userForm.value.name,
			email: this.userForm.value.email,
			is_active: this.userForm.value.is_active
		};

		this.userService.update(this.userID, updatedUser).subscribe(() => {
			alert('Usuario actualizado');
		});

	}


}
