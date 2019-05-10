import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMenuPage } from './set-menu.page';

describe('SetMenuPage', () => {
  let component: SetMenuPage;
  let fixture: ComponentFixture<SetMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
