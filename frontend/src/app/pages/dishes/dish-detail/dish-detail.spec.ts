import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishDetail } from './dish-detail';

describe('DishDetail', () => {
  let component: DishDetail;
  let fixture: ComponentFixture<DishDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
