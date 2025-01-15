import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioFormComponent } from './servicio-form.component';

describe('ServicioFormComponent', () => {
  let component: ServicioFormComponent;
  let fixture: ComponentFixture<ServicioFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicioFormComponent]
    });
    fixture = TestBed.createComponent(ServicioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
