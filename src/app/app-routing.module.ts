// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{
		path: 'dashboard',
		loadComponent: () => AdminComponent,
		loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
		canActivate: [AuthGuard]  // Protegemos la ruta con el guard
	},
	{
		path: 'auth',
		loadComponent: () => GuestLayoutComponent,
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: '**',
		loadComponent: () => import('./theme/layouts/not-found/not-found.component').then(m => m.NotFoundComponent)
	}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
