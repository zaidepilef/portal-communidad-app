import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SpinnerService {

	private loadingSubject = new BehaviorSubject<boolean>(false);

	isSpinnerVisible$ = this.loadingSubject.asObservable();

	mostrarSpinner() {
		this.loadingSubject.next(true);
	}

	ocultarSpinner() {
		this.loadingSubject.next(false);
	}
}
