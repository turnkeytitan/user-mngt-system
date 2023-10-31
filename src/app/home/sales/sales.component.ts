import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../products/list/list.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '@products/models/product';
import { ProductsService } from '@services/products/products.service';
import { InvoiceForm, InvoiceProduct } from './models/invoice-form';
import { ToastService } from '@services/toast/toast.service';
import { isInteger } from '@validators/integer.validator';
import { SalesService } from '@services/sales/sales.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, ListComponent, ReactiveFormsModule],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnDestroy {
  invoiceForm: FormGroup<InvoiceForm>;
  products$: Subscription;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private toast: ToastService,
    private sales: SalesService,
  ) {
    this.invoiceForm = this.fb.group({
      products: this.fb.array<InvoiceProduct>([]),
    });

    this.products$ = this.productService.getProducts().subscribe({
      next: (val) => (this.products = val),
    });
  }

  ngOnDestroy(): void {
    this.products$.unsubscribe();
  }
  createProduct(product: Product): InvoiceProduct {
    const { id, name, price, inventory } = product;
    return this.fb.nonNullable.group({
      id,
      name,
      price,
      inventory,
      quantity: [1, [Validators.required, Validators.min(0), isInteger()]],
    });
  }

  get productsArray(): FormArray {
    return this.invoiceForm.get('products') as FormArray;
  }

  addProduct(product: Product): void {
    !this.productsArray.controls.some((prod) => prod.value.id === product.id)
      ? this.productsArray.push(this.createProduct(product))
      : this.toast.showToast({
          type: 'error',
          message: 'That product has been already added to the invoice',
        });
  }

  removeProduct(index: number): void {
    this.productsArray.removeAt(index);
  }
  onSubmit() {
    this.sales
      .sendInvoice(
        this.invoiceForm.controls.products.getRawValue(),
        this.totalPrice,
      )
      .subscribe({
        next: () => {
          this.toast.showToast({ type: 'success', message: 'Invoice saved' });
          this.productsArray.reset();
        },
      });
  }
  control(index: number) {
    return this.invoiceForm.controls.products.at(index);
  }
  get totalPrice() {
    return this.invoiceForm.controls.products
      .getRawValue()
      .map((prod) => prod.price * prod.quantity)
      .reduce((prev, curr) => prev + curr, 0);
  }
  get totalQuantity() {
    return this.invoiceForm.controls.products
      .getRawValue()
      .reduce((prev, curr) => prev + curr.quantity, 0);
  }
  get formHasItems() {
    return !!this.invoiceForm.controls.products.value.length;
  }
}
