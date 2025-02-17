import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DefaultComponent } from './default/default.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { GastosComponent } from './gastos/gastos.component';
import { PeriodosComponent } from './periodos/periodos.component';
import { RolesComponent } from './roles/roles.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { SamplePageComponent } from './sample-page/sample-page.component';
import { CondominiosComponent } from './condominios/condominios.component';


const routes: Routes = [
  { path: '', redirectTo: 'default', pathMatch: 'full' },
  { path: 'default', component: DefaultComponent },
  { path: 'condominios', component: CondominiosComponent },

  { path: 'empresas', component: EmpresasComponent },

  { path: 'gastos', component: GastosComponent },
  { path: 'home', component: HomeComponent },
  { path: 'periodos', component: PeriodosComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'sample-page', component: SamplePageComponent },
  { path: 'unidades', component: UnidadesComponent },
  { path: 'usuarios', component: UsuariosComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboarRoutingModule { }
