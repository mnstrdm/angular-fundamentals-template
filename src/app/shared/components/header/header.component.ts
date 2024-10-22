import { Component, OnInit } from "@angular/core";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isAuthorised: boolean = false;

  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    this.authService.isAuthorized$.subscribe(
      (isAuth) => (this.isAuthorised = isAuth)
    );
  }
}
