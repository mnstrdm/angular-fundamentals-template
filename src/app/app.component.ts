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
  btnTextLogin: string = "Login";
  btnTextLogout: string = "Logout";

  faTrashCan: IconDefinition = faTrashCan;

  faPencil: IconDefinition = faPencil;
}
