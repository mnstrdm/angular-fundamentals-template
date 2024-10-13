import { Component } from "@angular/core";

import { ButtonLabels } from "./shared/constants/button-labels";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  //  text for buttons
  btnTextLogin: string = ButtonLabels.login;
  btnTextLogout: string = ButtonLabels.logout;
}
