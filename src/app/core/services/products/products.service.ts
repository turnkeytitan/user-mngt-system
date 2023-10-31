import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Product } from '@products/models/product';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private fs: Firestore) {}
  addProduct(prod: Omit<Product, 'id'>) {
    const prodRef = collection(this.fs, 'products');
    return from(addDoc(prodRef, prod));
  }
  editProduct(prod: Product) {
    const { id, ...rest } = prod;
    return from(updateDoc(this.docRef(`products/${id}`), rest));
  }
  docRef(ref: string) {
    return doc(this.fs, ref);
  }
  getProducts() {
    const prodRef = collection(this.fs, 'products');
    return collectionData(prodRef, { idField: 'id' }) as Observable<Product[]>;
  }
}
