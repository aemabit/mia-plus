import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSelectorPageRoutingModule } from './home-selector-routing.module';

import { HomeSelectorPage } from './home-selector.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSelectorPageRoutingModule,
    SharedModule
  ],
  declarations: [HomeSelectorPage]
})
export class HomeSelectorPageModule {}
