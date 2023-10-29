import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../products/list/list.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '@products/models/product';
import { ProductsService } from '@services/products/products.service';
import { InvoiceForm, InvoiceProduct } from './models/invoice-form';

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
    const {id, name, price, inventory} = product;
    return this.fb.nonNullable.group({
      id,
      name,
      price,
      inventory,
      quantity: '',
    });
  }

  get productsArray(): FormArray {
    return this.invoiceForm.get('products') as FormArray;
  }

  addProduct(product: Product): void {
    this.productsArray.push(this.createProduct(product));
  }

  removeProduct(index: number): void {
    this.productsArray.removeAt(index);
  }
  onSubmit() {
    console.log(this.invoiceForm.value);
  }
}
