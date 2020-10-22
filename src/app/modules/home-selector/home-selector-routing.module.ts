import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSelectorPage } from './home-selector.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSelectorPageRoutingModule {}
