import { FormControl, ValidationErrors } from "@angular/forms";

export class FormValidators {
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
        if ((control.value != null) && (control.value.trim().length === 0)) {
            return { 'notOnlyWhiteSpace': true };
        } else {
            return null;
        };
    }

    static removeMatCard() {
        let collection = document.getElementsByClassName('mat-mdc-form-field-subscript-wrapper') as HTMLCollection

        for (let i = 0; i < collection.length; i++) {
            let element = collection[i] as HTMLElement;
            element.style.display = "none";
        }
    }
}
