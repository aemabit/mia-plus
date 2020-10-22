import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormPaymentPage } from './form-payment.page';

describe('FormPaymentPage', () => {
  let component: FormPaymentPage;
  let fixture: ComponentFixture<FormPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
