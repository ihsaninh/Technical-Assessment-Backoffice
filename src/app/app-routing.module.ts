import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {
		path: 'auth',
		loadChildren: () =>
			import('./pages/auth/auth.module').then(m => m.AuthModule),
      canActivateChild: [AuthGuard]
	},
  {
    path: 'dashboard',
    loadChildren: () => 
      import('./layout/layout.module').then(m => m.LayoutModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),
  },
  {
		path: '**',
		redirectTo: '/not-found',
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
