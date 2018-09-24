import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePagesComponent } from './delete-pages.component';

describe('DeletePagesComponent', () => {
  let component: DeletePagesComponent;
  let fixture: ComponentFixture<DeletePagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
