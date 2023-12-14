import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditorModule } from 'primeng/editor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormLoginComponent } from './pages/form-login/form-login.component';
import { FormRegistrationComponent } from './pages/form-registration/form-registration.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeadlineCardComponent } from './components/landing-page/headline-card/headline-card.component';
import { StandardCardComponent } from './components/landing-page/standard-card/standard-card.component';
import { SidebarComponent } from './components/landing-page/sidebar/sidebar.component';
import { ArticlesByUserComponent } from './components/dashboard/articles-by-user/articles-by-user.component';
import { DashboardNavbarComponent } from './components/dashboard/dashboard-navbar/dashboard-navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormEditComponent } from './pages/form-edit/form-edit.component';
import { NewArticleComponent } from './pages/new-article/new-article.component';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthTokenInterceptor } from './core/interceptors/auth-token.interceptor';
import { DraftCardComponent } from './components/dashboard/draft-card/draft-card.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { DashboardImagesComponent } from './components/dashboard/dashboard-images/dashboard-images.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    FormRegistrationComponent,
    MainNavbarComponent,
    FooterComponent,
    HeadlineCardComponent,
    StandardCardComponent,
    SidebarComponent,
    ArticlesByUserComponent,
    DashboardNavbarComponent,
    ProfileComponent,
    DashboardComponent,
    FormEditComponent,
    NewArticleComponent,
    EditArticleComponent,
    HomeComponent,
    DraftCardComponent,
    DashboardHomeComponent,
    DashboardImagesComponent,
    ArticleDetailComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    EditorModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
