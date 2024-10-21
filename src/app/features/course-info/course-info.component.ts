import { Component, EventEmitter, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { Location } from "@angular/common";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Course } from "@app/shared/models/course.model";
import { forkJoin, Subscription } from "rxjs";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit, OnDestroy {
  course!: Course | undefined;
  btnTextBack: string = ButtonLabels.back;
  courseId: string | null = null;
  courseAuthors!: string[];
  authorsByName: string[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private courseStoreService: CoursesStoreService
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get("id");

    if (courseId) {
      this.courseStoreService.getCourse(courseId).subscribe({
        next: (course) => {
          this.course = course.result;
          this.courseAuthors = course.result.authors;
          if (this.courseAuthors.length > 0) {
            this.createAuthorsNameList(this.courseAuthors);
          }
          console.log(this.authorsByName);
        },
        error: (err) => {
          console.error("Hiba a kurzus adatainak betöltésekor:", err);
        },
      });
    }
  }

  createAuthorsNameList(authorsIdList: string[]): void {
    const authorsObservables = authorsIdList.map((id) =>
      this.courseStoreService.getAuthorById(id)
    );

    const sub = forkJoin(authorsObservables).subscribe(
      (authors) =>
        (this.authorsByName = authors.map((author) => author.result.name))
    );

    this.subscriptions.add(sub);
  }

  onBack() {
    this.location.back();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
