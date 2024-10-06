import { NgModule } from "@angular/core";
import { CoursesComponent } from "./courses.component";
import { SharedModule } from "@app/shared/shared.module";

@NgModule({
  declarations: [CoursesComponent],
  imports: [SharedModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
