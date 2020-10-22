import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormEmploymentPage } from './form-employment.page';

describe('FormEmploymentPage', () => {
  let component: FormEmploymentPage;
  let fixture: ComponentFixture<FormEmploymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEmploymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormEmploymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
