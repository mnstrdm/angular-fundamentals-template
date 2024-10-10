import { Component, Input } from "@angular/core";
import { ButtonLabels } from "@app/shared/constants/button-labels";
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
  btnTextBack: string = ButtonLabels.back;
  // Use the names for the input `course`.
}
