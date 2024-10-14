import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { mockedAuthorsList } from "@app/shared/mocks/mocks";
import { Observable } from "rxjs";
import { newCourse } from "@app/shared/models/course.model";
import { BaseUrl } from "@app/shared/constants/baseUrl";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  coursesApiUrl = `${BaseUrl}/courses`;
  authorsApiUrl = `${BaseUrl}/authors`;
  getAll(): Observable<any> {
    // Add your code here
    return this.http.get<any>(`${this.coursesApiUrl}/all`);
  }

  createCourse(course: newCourse): Observable<any> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post<any>(`${this.coursesApiUrl}/add`, course);
  }

  editCourse(id: string, course: any): Observable<any> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.put<any>(`${this.coursesApiUrl}/${id}`, course);
  }

  getCourse(id: string): Observable<any> {
    // Add your code here
    return this.http.get<any>(`${this.coursesApiUrl}/${id}`);
  }

  deleteCourse(id: string): Observable<any> {
    // Add your code here
    return this.http.delete<any>(`${this.coursesApiUrl}/${id}`);
  }

  filterCourses(value: string): Observable<any> {
    // Add your code here
    return this.http.get(`${this.coursesApiUrl}/filter?${value}`);
  }

  getAllAuthors(): Observable<any> {
    // Add your code here
    return this.http.get<any>(`${this.authorsApiUrl}/all`);
  }

  createAuthor(name: string): Observable<any> {
    // Add your code here
    return this.http.post<any>(`${this.authorsApiUrl}/add`, { name: name });
  }

  getAuthorById(id: string) {
    // Add your code here
    return this.http.get<any>(`${this.authorsApiUrl}/${id}`);
  }
}
