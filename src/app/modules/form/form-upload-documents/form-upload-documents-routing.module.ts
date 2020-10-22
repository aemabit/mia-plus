import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormUploadDocumentsPage } from './form-upload-documents.page';

const routes: Routes = [
  {
    path: '',
    component: FormUploadDocumentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormUploadDocumentsPageRoutingModule {}
