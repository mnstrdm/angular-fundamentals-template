import { Component } from "@angular/core";
import {
  faTrash,
  faPencil,
  IconDefinition,
  faTrashAlt,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  //  text for buttons
  btnTextLogin: string = "Login";
  btnTextLogout: string = "Logout";
  btnTextAddNewCourse: string = "Add New Course";

  // icons for buttons
  faTrashCan: IconDefinition = faTrashCan;
  faPencil: IconDefinition = faPencil;

  // info page text
  infoTitle = "Your List Is Empty";
  infoText = "Please use 'Add New Course' button to add your first course";
}
