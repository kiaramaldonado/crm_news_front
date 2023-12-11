import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormLoginComponent } from './pages/form-login/form-login.component';
import { FormRegistrationComponent } from './pages/form-registration/form-registration.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeadlineCardComponent } from './components/headline-card/headline-card.component';
import { StandardCardComponent } from './components/standard-card/standard-card.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ArticlesByUserComponent } from './components/articles-by-user/articles-by-user.component';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormEditComponent } from './pages/form-edit/form-edit.component';
import { NewArticleComponent } from './pages/new-article/new-article.component';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';
import { HomeComponent } from './pages/home/home.component';

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
