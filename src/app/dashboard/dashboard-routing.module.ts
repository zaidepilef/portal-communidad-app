import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: UsuariosComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class DashboarRoutingModule { }
