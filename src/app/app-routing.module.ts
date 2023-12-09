import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegistrationComponent } from './pages/form-registration/form-registration.component';
import { FormLoginComponent } from './pages/form-login/form-login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: 'registro', component: FormRegistrationComponent },
  { path: 'login', component: FormLoginComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
