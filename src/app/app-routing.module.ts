import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegistrationComponent } from './pages/form-registration/form-registration.component';
import { FormLoginComponent } from './pages/form-login/form-login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormEditComponent } from './pages/form-edit/form-edit.component';
import { NewArticleComponent } from './pages/new-article/new-article.component';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';
import { authGuard } from './core/guards/auth.guard';
import { ArticlesByUserComponent } from './components/dashboard/articles-by-user/articles-by-user.component';
import { DashboardImagesComponent } from './components/dashboard/dashboard-images/dashboard-images.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { FormAssignmentComponent } from './pages/form-assignment/form-assignment.component';
import { DashboardEquipoComponent } from './components/dashboard/dashboard-equipo/dashboard-equipo.component';
import { HomeDashboardComponent } from './components/dashboard/home-dashboard/home-dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/guirre' },

  {
    path: 'guirre', component: HomeComponent
  },
  {

    path: 'categoria/:category', component: HomeComponent

  },
  { path: 'articulo/:slug', component: ArticleDetailComponent },
  { path: 'registro', component: FormRegistrationComponent },
  { path: 'login', component: FormLoginComponent },
  {
    path: 'area-personal',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'perfil', component: FormEditComponent },
      { path: '', component: HomeDashboardComponent},
      { path: 'imagenes', component: DashboardImagesComponent },
      { path: 'equipo', component: DashboardEquipoComponent },
      { path: 'articulos', component: ArticlesByUserComponent },
      { path: 'articulos/publicados', component: ArticlesByUserComponent },
      { path: 'nuevo', component: NewArticleComponent },
      { path: 'edicion/:articleId', component: EditArticleComponent },
      { path: 'asignacion/:articleId', component: FormAssignmentComponent }

    ]
  },


  { path: '**', redirectTo: '/guirre' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


