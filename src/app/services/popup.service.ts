/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
	providedIn: 'root'
})

export class PopupService {

	private popupMessageSubject = new BehaviorSubject<string | null>(null);
	popupMessage$ = this.popupMessageSubject.asObservable();

	mostrarPopup(mensaje: string) {
		this.popupMessageSubject.next(mensaje);
	}
}
