import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPedidosBarraComponent } from './lista-pedidos-barra.component';

describe('ListaPedidosBarraComponent', () => {
  let component: ListaPedidosBarraComponent;
  let fixture: ComponentFixture<ListaPedidosBarraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPedidosBarraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPedidosBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
