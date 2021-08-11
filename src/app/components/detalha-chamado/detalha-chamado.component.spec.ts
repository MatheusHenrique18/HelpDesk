import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhaChamadoComponent } from './detalha-chamado.component';

describe('DetalhaChamadoComponent', () => {
  let component: DetalhaChamadoComponent;
  let fixture: ComponentFixture<DetalhaChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhaChamadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhaChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
