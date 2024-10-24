import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";

import { Course } from "@app/shared/models/course.model";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> = this.coursesStateFacades.allCourses$;
  constructor(
    private router: Router,
    private coursesStoreService: CoursesStoreService,
    private userStoreService: UserStoreService,
    private coursesStateFacades: CoursesStateFacade
  ) {}
  // info page text
  infoTitle = "Your List Is Empty";
  infoText = "Please use 'Add New Course' button to add your first course";

  courses: Course[] = [];
  isEditable: boolean = false;

  ngOnInit() {
    this.userStoreService.getUser();
    this.isEditable = this.userStoreService.isAdmin;
    /* this.coursesStoreService.courses$.subscribe((courses) => {
      this.courses = courses;
      
    }); */
    this.loadCourses();
    //this.coursesStoreService.getAll();
  }

  loadCourses() {
    this.coursesStateFacades.getAllCourses();
    this.courses$.subscribe((course) => (this.courses = course));
  }
  showCourse(courseId: string) {
    this.router.navigate(["/courses", courseId]);
  }
  deleteCourse(courseId: string) {
    //this.coursesStoreService.deleteCourse(courseId);
    this.coursesStateFacades.deleteCourse(courseId);
  }
  editCourse(courseId: string) {
    this.router.navigate(["/courses/edit", courseId]);
  }

  onSearch(searchTerm: string) {
    if (searchTerm === "") {
      this.loadCourses();
    } else {
      this.coursesStateFacades.getFilteredCourses(searchTerm);
    }
    //this.coursesStoreService.filterCourses(searchTerm);
  }
}
