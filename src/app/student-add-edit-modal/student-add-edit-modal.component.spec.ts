import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddEditModalComponent } from './student-add-edit-modal.component';

describe('StudentAddEditModalComponent', () => {
  let component: StudentAddEditModalComponent;
  let fixture: ComponentFixture<StudentAddEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAddEditModalComponent]
    });
    fixture = TestBed.createComponent(StudentAddEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
