import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import Invoice from '@sales/models/invoice.interface';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private fs: Firestore) {}
  sendInvoice(invoice: Pick<Invoice, 'id' | 'quantity'>[], total: number) {
    const placeRef = collection(this.fs, 'invoices');
    return from(addDoc(placeRef, { ...invoice, total }));
  }
}
