import { Injectable } from '@angular/core';
import { Toast } from '@interfaces/toast.interface';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastSubject: Subject<Toast | null> = new Subject();

  showToast(toast: Toast) {
    this.toastSubject.next(toast);
    setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  hideToast() {
    this.toastSubject.next(null);
  }

  getToast(): Observable<Toast | null> {
    return this.toastSubject.asObservable();
  }
}
