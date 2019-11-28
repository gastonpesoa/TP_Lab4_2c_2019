import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPedidosCocinaComponent } from './lista-pedidos-cocina.component';

describe('ListaPedidosCocinaComponent', () => {
  let component: ListaPedidosCocinaComponent;
  let fixture: ComponentFixture<ListaPedidosCocinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPedidosCocinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPedidosCocinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
