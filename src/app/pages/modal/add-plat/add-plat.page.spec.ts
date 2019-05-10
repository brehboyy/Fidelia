import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlatPage } from './add-plat.page';

describe('AddPlatPage', () => {
  let component: AddPlatPage;
  let fixture: ComponentFixture<AddPlatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
