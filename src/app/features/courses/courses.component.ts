import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { mockedCoursesList } from "@app/shared/mocks/mocks";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent {
  constructor(private router: Router) {}
  mockedCoursesList = mockedCoursesList;

  // info page text
  infoTitle = "Your List Is Empty";
  infoText = "Please use 'Add New Course' button to add your first course";

  showCourse(courseId: string) {
    this.router.navigate(["/courses", courseId]);
    console.log("Clicked on Show Course with ID:", courseId);
  }
  deleteCourse(courseId: string) {
    console.log("Clicked on Delete Course with ID:", courseId);
  }
  editCourse(courseId: string) {
    this.router.navigate(["/courses/edit", courseId]);
    console.log("Clicked on Edit Course with ID:", courseId);
  }
}
