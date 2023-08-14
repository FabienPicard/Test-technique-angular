import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { GenerationConfig } from "../generation-config";

@Component({
  selector: "app-person-generator",
  templateUrl: "./person-generator.component.html",
  styleUrls: ["./person-generator.component.scss"],
})
export class PersonGeneratorComponent implements OnInit {
  generator: FormGroup;

  @Output()
  private generateRequest = new EventEmitter<GenerationConfig>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.generator = this.formBuilder.group(
      {
        count: [1000],
        male: [true],
        female: [true],
      },
      {
        validator: this.atLeastOneCheckboxValidator(),
      }
    );
  }

  atLeastOneCheckboxValidator() {
    //On verifie si l'une ou les deux checkbox sont cochées et on return un boolean
    return (formGroup: FormGroup) => {
      const maleChecked = formGroup.get("male").value;
      const femaleChecked = formGroup.get("female").value;

      return maleChecked || femaleChecked ? null : { atLeastOneCheckbox: true };
    };
  }

  generate() {
    const value: GenerationConfig = this.generator.value;
    if (this.generator.valid) this.generateRequest.emit(value);
  }
}
