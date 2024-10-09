import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  IconDefinition,
  faTrashCan,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { Course } from "@app/shared/models/course.model";
import { ButtonLabels } from "@app/shared/constants/button-labels";
@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() isEditabel!: boolean;
  @Input() course!: Course;

  @Output() clickOnShow: EventEmitter<string> = new EventEmitter();
  @Output() clickOnDelete: EventEmitter<string> = new EventEmitter();
  @Output() clickOnEdit: EventEmitter<string> = new EventEmitter();

  btnTextShowCourse: string = ButtonLabels.showCourse;

  // icons for buttons
  faTrashCan: IconDefinition = faTrashCan;
  faPencil: IconDefinition = faPencil;

  onShowCourse() {
    this.clickOnShow.emit(this.course.id);
  }
  onDeleteCourse() {
    this.clickOnDelete.emit(this.course.id);
  }
  onEditCourse() {
    this.clickOnEdit.emit(this.course.id);
  }
}
