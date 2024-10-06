import { Pipe } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe {
  // Add your code here
  transform(dateString: string): string {
    const [m, d, y] = dateString.split("/");
    const formattedDate = `${d}.${m}.${y}`;

    return formattedDate;
  }
}
