import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegistrationFormComponent } from "./registration-form.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { CommonModule } from "@angular/common";
import { AuthModule } from "@app/auth/auth.module";
import { SharedModule } from "@app/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "", // Fontos, hogy üres path legyen, ha a /login-ra navigálsz
    component: RegistrationFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
];

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AuthModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class RegistrationFormModule {}
