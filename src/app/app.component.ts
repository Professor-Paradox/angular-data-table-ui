import { MatDialog } from '@angular/material/dialog';
import { StudentAddEditModalComponent } from './student-add-edit-modal/student-add-edit-modal.component';
import { StudentService } from './services/student.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'rollNo',
    'branch',
    'fullName',
    'email',
    'phoneNumber',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getStudentsList();
  }

  openStudentAddModal() {
    const dialogRef = this._dialog.open(StudentAddEditModalComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getStudentsList();
        }
      },
      error: (err) => {},
    });
  }

  getStudentsList() {
    this._studentService.getAllStudents().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteStudent(id: number) {
    this._studentService.deleteStudent(id).subscribe({
      next: (res) => {
        this.getStudentsList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openStudentEditModal(data: any) {
    const dialogRef = this._dialog.open(StudentAddEditModalComponent, { data });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.getStudentsList();
        }
      },
      error: (err) => {},
    });
  }
}