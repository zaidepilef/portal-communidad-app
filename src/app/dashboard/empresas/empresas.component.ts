/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
	selector: 'app-empresas',
	imports: [CardComponent],
	templateUrl: './empresas.component.html',
	styleUrl: './empresas.component.scss'
})

export class EmpresasComponent implements OnInit {

	private empresasService = inject(EmpresasService);
	empresas: any[] = [];

	ngOnInit() {
		this.obtenerEmpresas();
	}

	obtenerEmpresas() {
		this.empresasService.obtenerEmpresas().subscribe({
			next: (data) => (
				console.log('data : ',data),
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
