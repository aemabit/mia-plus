import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormDependentPageRoutingModule } from './form-dependent-routing.module';

import { FormDependentPage } from './form-dependent.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormDependentPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [FormDependentPage]
})
export class FormDependentPageModule {}
