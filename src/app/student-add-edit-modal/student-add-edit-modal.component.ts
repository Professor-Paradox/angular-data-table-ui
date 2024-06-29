import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-add-edit-modal',
  templateUrl: './student-add-edit-modal.component.html',
  styleUrls: ['./student-add-edit-modal.component.css'],
})
export class StudentAddEditModalComponent implements OnInit {
  studentForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<StudentAddEditModalComponent>,
    private _studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.studentForm = this._fb.group({
      rollNo: ['', Validators.required],
      branch: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.studentForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.data) {
      if (this.studentForm.valid) {
        this._studentService.updateStudent(this.data.id,this.studentForm.value).subscribe({
          next: (val: any) => {
            console.log('Employee Details Updated', val);
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    } else {
      if (this.studentForm.valid) {
        this._studentService.addStudent(this.studentForm.value).subscribe({
          next: (val: any) => {
            console.log('Employee Added', val);
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  onCloseClick(): void {
    this._dialogRef.close();
  }
}