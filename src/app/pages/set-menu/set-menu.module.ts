import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { DatePickerModule } from 'ionic4-date-picker';
import { IonicModule } from '@ionic/angular';

import { SetMenuPage } from './set-menu.page';
import { FilterPipe } from './set-menu.page';


const routes: Routes = [
  {
    path: '',
    component: SetMenuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FilterPipe,SetMenuPage]
})
export class SetMenuPageModule {}
