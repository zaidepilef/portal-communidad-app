/* eslint-disable @typescript-eslint/no-explicit-any */
// angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/users.service';


@Component({
	selector: 'app-default',
	imports: [CommonModule],
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {


	users: any[] = [];

	// constructor
	constructor(private userService :UserService) {

	}


	ngOnInit() {
		this.obtenerUsuarios();
	}

	obtenerUsuarios() {
		this.userService.getUsers().subscribe({
			next: (data) => (
				console.log('data : ', data),
				this.users = data
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
