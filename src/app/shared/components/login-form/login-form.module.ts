import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./login-form.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthModule } from "@app/auth/auth.module";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "@app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: LoginFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
];

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AuthModule,
    RouterModule,
    FormsModule,
    SharedModule,
  ],
})
export class LoginFormModule {}
