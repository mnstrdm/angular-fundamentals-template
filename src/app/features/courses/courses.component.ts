import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Course } from "@app/shared/models/course.model";
import { AuthorsStateFacade } from "@app/store/author/authors.facade";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> = this.coursesStateFacades.allCourses$;
  private subscriptions: Subscription[] = [];
  constructor(
    private router: Router,
    private coursesStateFacades: CoursesStateFacade,
    private authorsStateFacade: AuthorsStateFacade
  ) {}
  // info page text
  infoTitle = "Your List Is Empty";
  infoText = "Please use 'Add New Course' button to add your first course";

  courses: Course[] = [];
  isEditable: boolean = false;

  ngOnInit() {
    //this.userStoreService.getUser();
    this.authorsStateFacade.getAllAuthors();

    this.loadCourses();
  }

  loadCourses() {
    this.coursesStateFacades.getAllCourses();
    this.subscriptions.push(
      this.courses$.subscribe((course) => (this.courses = course))
    );
  }
  showCourse(courseId: string) {
    this.router.navigate(["/courses", courseId]);
  }
  deleteCourse(courseId: string) {
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
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscrition) => {
      subscrition.unsubscribe();
    });
  }
}
