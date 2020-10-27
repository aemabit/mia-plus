import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormUploadDocumentsPageRoutingModule } from './form-upload-documents-routing.module';

import { FormUploadDocumentsPage } from './form-upload-documents.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormUploadDocumentsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [FormUploadDocumentsPage]
})
export class FormUploadDocumentsPageModule {}
