import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormEmploymentPageRoutingModule } from './form-employment-routing.module';

import { FormEmploymentPage } from './form-employment.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormEmploymentPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [FormEmploymentPage]
})
export class FormEmploymentPageModule {}
