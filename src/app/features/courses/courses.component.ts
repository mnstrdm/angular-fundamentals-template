import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";

import { Course } from "@app/shared/models/course.model";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  constructor(
    private router: Router,
    private coursesStoreService: CoursesStoreService,
    private userStorageService: UserStoreService
  ) {}
  // info page text
  infoTitle = "Your List Is Empty";
  infoText = "Please use 'Add New Course' button to add your first course";

  courses: Course[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.userStorageService.getUser();
    this.coursesStoreService.courses$.subscribe((courses) => {
      this.courses = courses;
    });
    this.coursesStoreService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });
    this.coursesStoreService.getAll();
  }

  showCourse(courseId: string) {
    this.router.navigate(["/courses", courseId]);
  }
  deleteCourse(courseId: string) {
    console.log("Clicked on Delete Course with ID:", courseId);
  }
  editCourse(courseId: string) {
    this.router.navigate(["/courses/edit", courseId]);
    console.log("Clicked on Edit Course with ID:", courseId);
  }
}
