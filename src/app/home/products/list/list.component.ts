import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() items!: Product[];
  @Input() addable = false;
  @Output() newItemEvent = new EventEmitter<Product | null>();

  editProduct(item: Product | null, event?: any) {
    event?.pointerId !== -1 && this.newItemEvent.emit(item);
  }
  editProductkey(item: Product | null, event?: KeyboardEvent) {
    if (event?.code === 'Enter') {
      this.newItemEvent.emit(item);
    }
  }
}
