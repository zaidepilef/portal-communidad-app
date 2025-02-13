// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';

const routes: Routes = [


  {
		path: 'dashboard',
		loadComponent: () => AdminComponent,
		loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
		//canActivate: [AuthGuard]  // Protegemos la ruta con el guard
	},
	{
		path: 'auth',
		loadComponent: () => GuestLayoutComponent,
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
	},
  {
    path: 'authdemo',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/pages/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./demo/pages/authentication/auth-register/auth-register.component').then((c) => c.AuthRegisterComponent)
      }
    ]
  }

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
