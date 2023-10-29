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
  @Output() newItemEvent = new EventEmitter<Product | null>();

  editProduct(item: Product | null) {
    this.newItemEvent.emit(item);
  }
}
