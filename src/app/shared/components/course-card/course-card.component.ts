import { Component, Input } from "@angular/core";
import {
  faPencil,
  IconDefinition,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() isEditabel!: boolean;
}
