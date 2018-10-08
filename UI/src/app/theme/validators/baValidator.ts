import { AbstractControl, FormGroup } from '@angular/forms';
import { appVariables } from './../../app.constants';
export class BaValidator {
  static email(c: AbstractControl) {
    // tslint:disable-next-line:max-line-length
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false,
      },
    };
  }
  static ng2TagsInputEmail(c: AbstractControl) {
    // tslint:disable-next-line:max-line-length
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return EMAIL_REGEXP.test(c.value) ? null : {
      invalidateEmail: true,
    };
  }

  static compare(firstField, secondField) {
    return (c: FormGroup) => {
      // tslint:disable-next-line:max-line-length
      return (c.controls && c.controls[firstField].value === c.controls[secondField].value) ? null : {
        equal: {
          valid: false,
        },
      };
    };
  }
  static digitsOnly(c: AbstractControl) {
    const digitsRegEx = /^[0-9]*$/;
    return digitsRegEx.test(c.value) ? null : {
      digitsOnly: {
        valid: false,
      },
    };
  }
  static dropDownRequired(c: AbstractControl) {
    return c.value !== appVariables.defaultDdlOptionValue ? null : {
      required: true,
    };
  }
}
