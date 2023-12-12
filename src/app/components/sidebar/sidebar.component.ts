import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/core/models/category.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() categories: Category[] = [];
  @Input() selectedCategory: Category | null = null;
  @Output() categorySelected = new EventEmitter<Category | null>();

  emitCategorySelection(category: Category | null): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }
}
