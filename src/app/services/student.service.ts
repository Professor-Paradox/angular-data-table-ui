import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  // Change the api url to localhost:8080 for windows testing only if not don't change this variable
  private apiUrl = '/api/student';  // for ubuntu
  // private apiUrl = 'http://localhost:8080/api/student'; // for windows 

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addStudent(student: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, student);
  }

  addStudents(students: any[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/bulk`, students);
  }

  updateStudent(id: number, student: any): Observable<any> {
    student['id'] = id;
    return this.http.put<any>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  searchStudents(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/search?searchTerm=${searchTerm}`
    );
  }

  private selectedStudent: any;
  setSelectedStudent(student: any): void {
    this.selectedStudent = student;
  }

  getSelectedStudent(): any {
    return this.selectedStudent;
  }
}
