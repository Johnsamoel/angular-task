import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumPhotosComponent } from './components/album-photos/album-photos.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AuthGuardService } from './guards/auth-guard-service';

const routes: Routes = [
  { path: 'user/:id', component: AlbumsListComponent ,canActivate: [AuthGuardService] },
  { path: '', component: UsersListComponent,canActivate: [AuthGuardService] },
  {path:'album/:id',component:AlbumPhotosComponent , canActivate: [AuthGuardService]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'**',redirectTo:'/'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
