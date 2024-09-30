import { Component, Input, OnInit } from "@angular/core";
import { CoursesService } from "@app/services/courses.service";
interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}
@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  @Input() course!: Course;
  // Use the names for the input `course`.
  id: string = "";
  title: string = "";
  description: string = "";
  creationDate: string = "";
  duration: string = "";
  authors: string[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.id = this.course.id;
    this.title = this.course.title;
    this.description = this.course.description;
    this.creationDate = this.coursesService.formatCreationDate(
      this.course.creationDate
    );
    this.duration = this.coursesService.getCourseDuration(this.course.duration);
    this.authors = this.course.authors.map((authorId: string) =>
      this.coursesService.getAuthorById(authorId)
    );
  }
}
