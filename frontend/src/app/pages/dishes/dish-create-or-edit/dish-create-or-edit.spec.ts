import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCreateOrEdit } from './dish-create-or-edit';

describe('DishCreateOrEdit', () => {
  let component: DishCreateOrEdit;
  let fixture: ComponentFixture<DishCreateOrEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishCreateOrEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishCreateOrEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
