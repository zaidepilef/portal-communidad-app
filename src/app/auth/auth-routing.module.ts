import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { AutorizarComponent } from './autorizar/autorizar.component';
import { ActivacionComponent } from './activacion/activacion.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'autorizar/:token', component: AutorizarComponent },
  { path: 'activacion', component: ActivacionComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
