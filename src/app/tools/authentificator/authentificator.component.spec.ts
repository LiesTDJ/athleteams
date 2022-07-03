import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificatorComponent } from './authentificator.component';

describe('AuthentificatorComponent', () => {
  let component: AuthentificatorComponent;
  let fixture: ComponentFixture<AuthentificatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthentificatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthentificatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
