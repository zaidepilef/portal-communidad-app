/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Community } from 'src/app/models/community-model';
import { Enterprise } from 'src/app/models/enterprise-model';
import { CommunitiesService } from 'src/app/services/communities.service';
import { EnterprisesService } from 'src/app/services/empresas.service';

@Component({
	imports: [ReactiveFormsModule],
	selector: 'app-condominio-details',
	templateUrl: './condominio-details.component.html',
	styleUrls: ['./condominio-details.component.scss'] // corregido: 'styleUrl' → 'styleUrls'
})
export class CondominioDetailsComponent implements OnInit {
	condominioId!: number;
	form!: FormGroup;
	empresas: Enterprise[] = [];

	constructor(
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private communityService: CommunitiesService,
		private enterpriseService: EnterprisesService,
	) { }

	ngOnInit(): void {
		this.condominioId = +this.route.snapshot.paramMap.get('id')!;
		this.form = this.fb.group({
			name: ['', Validators.required],
			address: ['', Validators.required],
			enterprise_id: ['', Validators.required]
		});

		this.getCondominioDetails(this.condominioId);
		this.loadEnterprises();
	}

	getCondominioDetails(id: number) {
		this.communityService.getById(id).subscribe((data: Community) => {
			this.form.patchValue(data);
		});
	}

	loadEnterprises() {
		this.enterpriseService.get().subscribe({
			next: (data) => this.empresas = data,
			error: (err) => console.error('Error cargando empresas', err)
		});
	}

	onSubmit() {
		if (this.form.invalid) return;

		this.communityService.update(this.condominioId, this.form.value).subscribe({
			next: () => alert('Condominio actualizado correctamente'),
			error: (err) => {
				console.error('Error al actualizar:', err);
				alert('Hubo un error al guardar los cambios.');
			}
		});
	}
}
