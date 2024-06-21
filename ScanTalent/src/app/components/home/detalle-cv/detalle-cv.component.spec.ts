import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCvComponent } from './detalle-cv.component';

describe('DetalleCvComponent', () => {
  let component: DetalleCvComponent;
  let fixture: ComponentFixture<DetalleCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
