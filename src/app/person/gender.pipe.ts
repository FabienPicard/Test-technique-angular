import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "gender",
})
export class GenderPipe implements PipeTransform {
  transform(gender: string): string {
    if (gender === "Female") {
      gender = "Femme";
    } else {
      gender = "Homme";
    }
    return gender;
  }
}
