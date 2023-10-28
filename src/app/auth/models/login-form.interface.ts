import { FormControl } from '@angular/forms';

export default interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}
