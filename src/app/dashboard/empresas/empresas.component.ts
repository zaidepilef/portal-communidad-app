/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Enterprise } from 'src/app/models/enterprise-model';
import { EnterprisesService } from 'src/app/services/empresas.service';

@Component({
	selector: 'app-empresas',
	imports: [],
	templateUrl: './empresas.component.html',
	styleUrl: './empresas.component.scss'
})

export class EmpresasComponent implements OnInit {

	private enterpriseService = inject(EnterprisesService);
	empresas: Enterprise[] = [];

	constructor(private router: Router) { }

	ngOnInit() {
		this.getEnterprises();
	}

	getEnterprises() {
		this.enterpriseService.get().subscribe({
			next: (data) => (
				this.empresas = data
			),
			error: (err) => console.error('Error al obtener empresas:', err),
		});
	}


	detailsEnterprise(id: number) {
		console.log('Ver detalles de la empresa:', id);
		// Aquí podrías redirigir a una página de detalles
		this.router.navigate(['/dashboard/empresas', id]);
	}

	trackById(index: number, item: any): number {
		return item.id;
	}
}
