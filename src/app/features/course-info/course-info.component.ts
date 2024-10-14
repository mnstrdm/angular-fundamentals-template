import { Component, EventEmitter, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { mockedCoursesList } from "@app/shared/mocks/mocks";
import { Location } from "@angular/common";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Course } from "@app/shared/models/course.model";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  course!: Course | undefined;
  btnTextBack: string = ButtonLabels.back;
  courseId: string | null = null;
  courseAuthors!: string[];
  authorNames!: string[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private courseStoreService: CoursesStoreService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get("id");

    if (this.courseId) {
      this.courseStoreService.getCourse(this.courseId).subscribe({
        next: (course) => {
          this.course = course.result;
          this.courseAuthors = course.result.authors;
        },
      });
      //this.getAuthorById();
    }
  }

  getAuthorById(): void {
    this.courseAuthors.forEach((id) => {
      this.courseStoreService.getAuthorById(id).subscribe((author) => {
        this.authorNames.push(author.result.name);
      });
    });
  }

  onBack() {
    this.location.back();
  }
}
