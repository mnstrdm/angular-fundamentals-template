import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  IconDefinition,
  faTrashCan,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}
@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent {
  @Input() courses!: Course[];
  @Input() editable!: boolean;
  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  btnTextShowCourse: string = "Show Course";

  // icons for buttons
  faTrashCan: IconDefinition = faTrashCan;
  faPencil: IconDefinition = faPencil;

  onShowCourse(courseId: string) {
    console.log("Emit course ID from Course List with Show Course");
    this.showCourse.emit(courseId);
  }
  onDeleteCourse(courseId: string) {
    console.log("Emit course ID from Course List with Delete Course");
    this.deleteCourse.emit(courseId);
  }
  onEditCourse(courseId: string) {
    console.log("Emit course ID from Course List with Edit Course");
    this.editCourse.emit(courseId);
  }
}
