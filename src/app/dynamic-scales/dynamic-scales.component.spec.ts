import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicScalesComponent } from './dynamic-scales.component';

describe('DynamicScalesComponent', () => {
  let component: DynamicScalesComponent;
  let fixture: ComponentFixture<DynamicScalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicScalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicScalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
