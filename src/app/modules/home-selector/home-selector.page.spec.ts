import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeSelectorPage } from './home-selector.page';

describe('HomeSelectorPage', () => {
  let component: HomeSelectorPage;
  let fixture: ComponentFixture<HomeSelectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSelectorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
