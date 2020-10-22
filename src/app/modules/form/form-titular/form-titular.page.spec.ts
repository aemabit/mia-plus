import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormTitularPage } from './form-titular.page';

describe('FormTitularPage', () => {
  let component: FormTitularPage;
  let fixture: ComponentFixture<FormTitularPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTitularPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormTitularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
