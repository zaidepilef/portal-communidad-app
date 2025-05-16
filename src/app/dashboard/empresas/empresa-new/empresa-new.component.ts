import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';

import { EnterprisesService } from 'src/app/services/empresas.service';

@Component({
	selector: 'app-empresa-detalle',
	standalone: true,
	imports: [ReactiveFormsModule, RouterModule],
	templateUrl: 'empresa-new.component.html',
	styleUrls: ['empresa-new.component.scss']
})

export class EmpresaNuevaComponent implements OnInit {

	form!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private service: EnterprisesService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			razon_social: ['', Validators.required],
			rut: [''],
			domicilio: [''],
			phone: [''],
			contact_email: [''],
			representante_legal: [''],
			tipo_empresa: ['SPA'],
			estado: ['Activa']
		});
	}

	onSubmit() {
		if (this.form.invalid) return;

		this.service.create(this.form.value).subscribe({
			next: () => {
				alert('Empresa creada');
				this.router.navigate(['/dashboard/empresas']);
			},
			error: (err) => console.error('Error al crear empresa', err)
		});
	}
}
