import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { DetailComponent } from './components/detail/detail.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyPostComponent } from './components/my-post/my-post.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"detail/:id", component: DetailComponent},
  {path:'register', component: RegisterComponent},
  {path:'recover-password', component:RecoverPasswordComponent},
  {path:'create-post', component: CreatePostComponent},
  {path:'my-posts', component: MyPostComponent},
  {path:'**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
