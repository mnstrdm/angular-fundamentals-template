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
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  @Input() course!: Course;
  btnTextBack: string = "Back";
  // Use the names for the input `course`.
}
