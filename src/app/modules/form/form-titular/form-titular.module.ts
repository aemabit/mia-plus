import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormTitularPageRoutingModule } from './form-titular-routing.module';

import { FormTitularPage } from './form-titular.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormTitularPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [FormTitularPage]
})
export class FormTitularPageModule {}
