import { Component, EventEmitter, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { Location } from "@angular/common";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Course } from "@app/shared/models/course.model";
import { map, Observable, Subscription } from "rxjs";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit, OnDestroy {
  course!: Course | null;
  course$: Observable<Course | null> = this.coursesStateFacade.course$;
  btnTextBack: string = ButtonLabels.back;
  courseId: string | null = null;
  authorsByName: string[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private courseStoreService: CoursesStoreService,
    private coursesStateFacade: CoursesStateFacade
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get("id");

    if (courseId) {
      this.coursesStateFacade.getSingleCourse(courseId);
      const subscribeIsSingleCourseLoading =
        this.coursesStateFacade.isSingleCourseLoading$.subscribe(
          (isCourseLoading) => {
            !isCourseLoading &&
              this.subscriptions.push(
                this.course$.subscribe((course) => {
                  this.course = course;
                  const subscribeGetAuthorsById = this.courseStoreService
                    .getAuthorsById(course!.authors)
                    .pipe(
                      map((authors) => authors.map((author) => author.name))
                    )
                    .subscribe(
                      (authorsName) => (this.authorsByName = authorsName)
                    );
                  this.subscriptions.push(subscribeGetAuthorsById);
                })
              );
          }
        );
      this.subscriptions.push(subscribeIsSingleCourseLoading);
    }
  }

  onBack() {
    this.location.back();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscrition) => {
      subscrition.unsubscribe();
    });
  }
}
