import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { LoginGuardGuard } from './guard/login-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'hello', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuardGuard]},
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'hello', loadChildren: './hello/hello.module#HelloPageModule', canActivate: [AuthGuardGuard]},
  { path: 'evaluation', loadChildren: './evaluation/evaluation.module#EvaluationPageModule' },
  { path: 'detail-news', loadChildren: './detail-news/detail-news.module#DetailNewsPageModule' },
  { path: 'playlist', loadChildren: './playlist/playlist.module#PlaylistPageModule' },
  { path: 'doctor-list', loadChildren: './doctor-list/doctor-list.module#DoctorListPageModule' },
  { path: 'doctor-preview', loadChildren: './doctor-preview/doctor-preview.module#DoctorPreviewPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'video-playlist', loadChildren: './video-playlist/video-playlist.module#VideoPlaylistPageModule' },
  { path: 'result', loadChildren: './evaluation/result/result.module#ResultPageModule' },
  { path: 'rating', loadChildren: './doctor-preview/rating/rating.module#RatingPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
