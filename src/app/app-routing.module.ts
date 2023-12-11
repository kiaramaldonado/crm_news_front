import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegistrationComponent } from './pages/form-registration/form-registration.component';
import { FormLoginComponent } from './pages/form-login/form-login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormEditComponent } from './pages/form-edit/form-edit.component';
import { NewArticleComponent } from './pages/new-article/new-article.component';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/guirre' },
  { path: 'guirre', component: HomeComponent },
  { path: 'registro', component: FormRegistrationComponent },
  { path: 'login', component: FormLoginComponent },
  {
    path: 'area-personal',
    component: DashboardComponent,
    children: [
      { path: 'perfil', component: FormEditComponent },
      { path: 'nuevo', component: NewArticleComponent },
      { path: 'edicion', component: EditArticleComponent }
    ]
  },

  { path: '**', redirectTo: '/guirre' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// {
//   path: 'dashboard',
//   component: Component,
//   children: [
//     { path: 'form-edit', component:  },
//     { path: 'new', component:  },
//     { path: 'articlesByUser', component:  },
//     { path: 'logout', component:  }
//   ]
// }