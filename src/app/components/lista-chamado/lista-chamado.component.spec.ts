import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaChamadoComponent } from './lista-chamado.component';

describe('ListaChamadoComponent', () => {
  let component: ListaChamadoComponent;
  let fixture: ComponentFixture<ListaChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaChamadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
