/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
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


	verDetalles(id: number) {
		console.log('Ver detalles de la empresa:', id);
		// Aquí podrías redirigir a una página de detalles
	}

	trackById(index: number, item: any): number {
		return item.id;
	}
}
