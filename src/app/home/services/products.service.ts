import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,

} from '@angular/fire/firestore';
import { Product } from '../products/models/product';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private fs: Firestore) {}
  addProduct(place: Omit<Product, 'id'>) {
    const placeRef = collection(this.fs, 'products');
    return from(addDoc(placeRef, place));
  }
  editProduct(place: Product) {
    const { id, ...rest } = place;
    return from(updateDoc(this.docRef(`products/${id}`),rest));
  }
  docRef(ref: string) {
    return doc(this.fs, ref);
  }
  getProducts() {
    const placeRef = collection(this.fs, 'products');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Product[]>;
  }
}
