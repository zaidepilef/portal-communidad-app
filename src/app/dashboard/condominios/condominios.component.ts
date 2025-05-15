/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommunitiesService } from 'src/app/services/communities.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-condominios',
	imports: [CardComponent],
	templateUrl: './condominios.component.html',
	styleUrl: './condominios.component.scss'
})
export class CondominiosComponent implements OnInit {

	private service = inject(CommunitiesService);
	private router = inject(Router); // ✅ importante
	communities: any[] = [];

	ngOnInit() {
		this.get();
	}

	get() {
		this.service.get().subscribe({
			next: (data) => (
				console.log('data : ', data),
				this.communities = data
			),
			error: (err) => console.error('Error al obtener empresas:', err),
		});
	}


	details(community: any) {
		this.router.navigate(['/condominio', community.id]); // ✅ redirigir
	}
}
