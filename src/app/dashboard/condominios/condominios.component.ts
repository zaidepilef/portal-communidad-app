/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommunitiesService } from 'src/app/services/communities.service';
import { Router } from '@angular/router';
import { EnterprisesService } from 'src/app/services/empresas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Enterprise } from 'src/app/models/enterprise-model';
import { Community } from 'src/app/models/community-model';

@Component({
	selector: 'app-condominios',
	imports: [ReactiveFormsModule],
	templateUrl: './condominios.component.html',
	styleUrl: './condominios.component.scss'
})
export class CondominiosComponent implements OnInit {
	communities: Community[] = [];
	enterprises: Enterprise[] = [];

	form!: FormGroup;
	showNew = false;

	constructor(
		private communityService: CommunitiesService,
		private enterpriseService: EnterprisesService,
		private router: Router,
		private fb: FormBuilder
	) { }

	ngOnInit() {
		this.enterpriseService.get().subscribe((data) => (this.enterprises = data));
		this.get();
		this.form = this.fb.group({
			name: ['', Validators.required],
			address: ['', Validators.required],
			enterprise_id: ['', Validators.required]
		});

	}

	get() {
		this.communityService.get().subscribe({
			next: (data) => (
				console.log('data : ', data),
				this.communities = data
			),
			error: (err) => console.error('Error al obtener communities:', err),
		});
	}

	abrirNuevaComunidad() {
		this.showNew = true;
	}

	crearComunidad() {
		if (this.form.invalid) return;

		this.communityService.create(this.form.value).subscribe({
			next: () => {
				alert('Comunidad creada');
				this.showNew = false;
				this.form.reset();
				this.get(); // Recarga lista
			},
			error: (err) => {
				console.error('Error al crear comunidad', err);
				alert('No se pudo crear la comunidad');
			}
		});
	}


	cancelar() {
		this.showNew = false;
		this.form.reset();
	}

	details(community: any) {
		this.router.navigate(['/dashboard/condominio-details', community.id]); // ✅ redirigir
	}
}
