import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormDependentPage } from './form-dependent.page';

describe('FormDependentPage', () => {
  let component: FormDependentPage;
  let fixture: ComponentFixture<FormDependentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDependentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormDependentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
