import { Component, Input } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import {
  faAnglesDown,
  faPencil,
  fas,
  faTrashCan,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  // Use the names for the inputs `buttonText` and `iconName`.
  @Input() buttonText?: string;
  @Input() iconName?: IconDefinition;

  /* currIcon: IconDefinition | undefined =
    this.iconName === "faTrashCan"
      ? faTrashCan
      : this.iconName === "faPencil"
      ? faPencil
      : undefined; */
}
