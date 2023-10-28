import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Toast } from '@interfaces/toast.interface';
import { ToastService } from '@services/toast/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toast: Observable<Toast | null>;
  constructor(private toastService: ToastService) {
    this.toast = this.toastService.getToast();
  }
  closeToast() {
    this.toastService.hideToast();
  }
}
