import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Course } from "@app/shared/models/course.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http
      .get<any>(`${environment.serverApiUrl}/courses/all`)
      .pipe(map((response) => response.result));
  }

  createCourse(course: Course): Observable<any> {
    return this.http
      .post<any>(`${environment.serverApiUrl}/courses/add`, course)
      .pipe(map((response) => response.result));
  }

  editCourse(id: string, course: Course): Observable<any> {
    return this.http
      .put<any>(`${environment.serverApiUrl}/courses/${id}`, course)
      .pipe(map((response) => response.result));
  }

  getCourse(id: string): Observable<any> {
    return this.http.get<any>(`${environment.serverApiUrl}/courses/${id}`);
  }

  getSpecificCourse(id: string): Observable<any> {
    return this.http
      .get<any>(`${environment.serverApiUrl}/courses/${id}`)
      .pipe(map((response) => response.result));
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.serverApiUrl}/courses/${id}`);
  }
  // maybe return the result here as well as getAll
  filterCourses(value: string): Observable<any> {
    return this.http.get(`${environment.serverApiUrl}/courses/filter?${value}`);
  }

  getAllAuthors(): Observable<any> {
    return this.http.get<any>(`${environment.serverApiUrl}/authors/all`);
  }

  createAuthor(name: string): Observable<any> {
    return this.http.post<any>(`${environment.serverApiUrl}/authors/add`, {
      name: name,
    });
  }

  getAuthorById(id: string) {
    return this.http.get<any>(`${environment.serverApiUrl}/authors/${id}`);
  }
}
