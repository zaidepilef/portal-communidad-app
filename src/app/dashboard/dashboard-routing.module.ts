import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DefaultComponent } from './default/default.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { GastosComponent } from './gastos/gastos.component';
import { PeriodosComponent } from './periodos/periodos.component';
import { RolesComponent } from './roles/roles.component';


const routes: Routes = [
  { path: '', redirectTo: 'default', pathMatch: 'full' },
  { path: 'default', component: DefaultComponent },
  { path: 'empresas', component: EmpresasComponent },

  { path: 'gastos', component: GastosComponent },
  { path: 'home', component: HomeComponent },
  { path: 'periodos', component: PeriodosComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'usuarios', component: UsuariosComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboarRoutingModule { }
