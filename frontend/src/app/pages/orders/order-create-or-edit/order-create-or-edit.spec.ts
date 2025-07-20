import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreateOrEdit } from './order-create-or-edit';

describe('OrderCreateOrEdit', () => {
  let component: OrderCreateOrEdit;
  let fixture: ComponentFixture<OrderCreateOrEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCreateOrEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCreateOrEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
