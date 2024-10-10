import { Pipe } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe {
  transform(minutes: number): string {
    if (minutes < 0) {
      minutes = 0;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes =
      remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;

    const hourText = hours <= 1 ? "hour" : "hours";

    const formattedDuration = `${formattedHours}:${formattedMinutes} ${hourText}`;

    return formattedDuration;
  }
}
