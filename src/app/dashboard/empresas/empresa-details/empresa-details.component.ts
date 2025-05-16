import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Community } from 'src/app/models/community-model';
import { Enterprise } from 'src/app/models/enterprise-model';
import { CommunitiesService } from 'src/app/services/communities.service';
import { EnterprisesService } from 'src/app/services/empresas.service';

@Component({
	selector: 'app-empresa-detalle',
	standalone: true,
	imports: [ReactiveFormsModule,RouterModule],
	templateUrl: 'empresa-details.component.html',
	styleUrls: ['empresa-details.component.scss']
})
export class EmpresaDetalleComponent implements OnInit {
	empresaId!: number;
	empresa!: Enterprise;
	communities: Community[] = [];

	enterpriseForm!: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private enterpriseService: EnterprisesService,
		private communityService: CommunitiesService,
		private fb: FormBuilder
	) { }


	loadEnterprise() {
		this.enterpriseService.getById(this.empresaId).subscribe({
			next: (data) => {
				this.empresa = data;this.enterpriseForm.patchValue(data)
			},
			error: (err) => console.error('Error al obtener empresa:', err)
		});
	}

	loadCommunities() {
		this.communityService.get().subscribe((list) => {
			this.communities = list.filter((c: Community) => +c.enterprise_id === this.empresaId);
		});
	}

	updateEmpresa() {
		if (this.enterpriseForm.invalid) {
			alert('Formulario inválido');
			return;
		}
		this.enterpriseService.update(this.empresaId, this.enterpriseForm.value).subscribe(() => {
			alert('Empresa actualizada');
			//this.editMode = false;
			this.loadEnterprise();
		});
	}

	agregarComunidad() {
		/*
		if (this.communityForm.invalid) return;
		this.communityService.create(this.communityForm.value).subscribe(() => {
			alert('Comunidad creada');
			this.communityForm.reset({ enterprise_id: this.empresaId });
			this.showNewCommunity = false;
			this.loadCommunities();
		});
		*/
	}

	ngOnInit(): void {

		this.empresaId = +this.route.snapshot.paramMap.get('id')!;
		this.loadEnterprise();
		this.loadCommunities();

		this.enterpriseForm = this.fb.group({
			razon_social: ['', Validators.required],
			domicilio: [''],
			rut: [''],
			phone: [''],
			contact_email: [''],
			representante_legal: [''],
			tipo_empresa: ['']
		});
	}
}
