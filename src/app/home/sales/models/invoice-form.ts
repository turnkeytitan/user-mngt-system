import { FormArray, FormControl, FormGroup } from '@angular/forms';

type InvoiceForm = {
  products: FormArray<InvoiceProduct>;
};
type InvoiceProduct = FormGroup<{
  id: FormControl<string>;
  name: FormControl<string>;
  price: FormControl<number>;
  quantity: FormControl<string>;
  inventory: FormControl<number>;
}>;

export {InvoiceForm, InvoiceProduct}
