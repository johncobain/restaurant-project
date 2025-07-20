import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCreateOrEdit } from './client-create-or-edit';

describe('ClientCreateOrEdit', () => {
  let component: ClientCreateOrEdit;
  let fixture: ComponentFixture<ClientCreateOrEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCreateOrEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCreateOrEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
