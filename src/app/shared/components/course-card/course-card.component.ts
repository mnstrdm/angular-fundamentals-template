import { Component, Input } from "@angular/core";
interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}
@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() isEditabel!: boolean;
  @Input() course!: Course;

  /* title = this.course.title;
  description = this.course.description;
  authors = this.course.authors.join(", ");
  duration = this.course.duration;
  created = this.course.creationDate; */
}
