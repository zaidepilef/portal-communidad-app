/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


declare let bootstrap: any; // 👈 Esto soluciona el error



@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	private popupMessageSubject = new BehaviorSubject<string | null>(null);
	popupMessage$ = this.popupMessageSubject.asObservable();



	mostrarPopup(mensaje: string) {
		this.popupMessageSubject.next(mensaje);
		const modalElement = document.getElementById('popupModal');
		if (modalElement) {
		  const modal = new bootstrap.Modal(modalElement);
		  modal.show();
		}
	  }
}
