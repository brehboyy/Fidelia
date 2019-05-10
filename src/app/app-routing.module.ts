import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage';

const routes: Routes = [
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'set-menu', loadChildren: './pages/set-menu/set-menu.module#SetMenuPageModule' },
  { path: '', loadChildren: './pages/set-menu/set-menu.module#SetMenuPageModule' },
  { path: 'add-plat', loadChildren: './pages/modal/add-plat/add-plat.module#AddPlatPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
