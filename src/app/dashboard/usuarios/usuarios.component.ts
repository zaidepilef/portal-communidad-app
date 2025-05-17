/* eslint-disable @typescript-eslint/no-explicit-any */
// angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user-model';
import { Router } from '@angular/router';


@Component({
	selector: 'app-default',
	imports: [CommonModule],
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {


	users: User[] = [];


	// constructor
	constructor(private router: Router, private userService :UsersService) {}


	ngOnInit() {
		this.getUsers();
	}


	getUsers() {
		this.userService.get().subscribe({
			next: (data) => (
				this.users = data
			),
			error: (err) => console.error('Error al obtener usuarios:', err),
		});
	}


	itemDetails(id: number) {
		// Aquí podrías redirigir a una página de detalles
		this.router.navigate(['/dashboard/usuario-details', id]);
	}



}
