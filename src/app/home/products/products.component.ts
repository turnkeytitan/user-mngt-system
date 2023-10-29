import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductForm } from './models/product-form';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from './models/product';
import { ProductsService } from '../services/products.service';
import { Subscription } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ListComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnDestroy {
  productForm: FormGroup<ProductForm>;
  addProduct$: Subscription;
  products$: Subscription;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
  ) {
    this.productForm = this.fb.nonNullable.group({
      id: '',
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      inventory: [0, [Validators.required, Validators.min(0)]],
    });
    this.addProduct$ = EMPTY_SUBSCRIPTION;
    this.products$ = EMPTY_SUBSCRIPTION;
    this.getProducts();
  }
  ngOnDestroy(): void {
    this.addProduct$.unsubscribe();
    this.products$.unsubscribe();
  }

  getProducts() {
    this.products$.unsubscribe();
    this.products$ = this.productService.getProducts().subscribe({
      next: (val) => (this.products = val),
    });
  }
  addProduct() {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.getRawValue();
      const { id, ...rest } = productData;

      if (id === '') {
        this.addProduct$ = this.productService.addProduct(rest).subscribe({
          next: console.log,
          error: console.log,
        });
      } else {
        this.addProduct$ = this.productService
          .editProduct(productData)
          .subscribe({
            next: console.log,
            error: console.log,
          });
      }

      this.productForm.reset();
    }
  }
  editProduct(item: Product | null) {
    item ? this.productForm.patchValue(item) : this.productForm.reset();
  }
}
