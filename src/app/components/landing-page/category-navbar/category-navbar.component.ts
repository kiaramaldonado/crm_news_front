import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Category } from 'src/app/core/models/category.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent {
  @Input() categories: Category[] = [];
  @Input() selectedCategory: Category | null = null;
  @Output() categorySelected = new EventEmitter<Category | null>();

  showSubcategories: { [categoryId: number]: boolean } = {};
  showCategories = true;

  constructor(private router: Router) { };

  emitCategorySelection(category: Category | null): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }

  getSubcategories(parentId: number | null): Category[] {
    return this.categories.filter(category => category.parent_id === parentId);
  }

  navigateToCategory(event: Event, category: any): void {
    if (category === null) {
      this.router.navigate(['/guirre']);
      this.emitCategorySelection(null);
    } else {
      event.stopPropagation();
      const categoryNameWithDashes = category.name.toLowerCase().replace(/[,\s]+/g, '-').normalize("NFD").replace(/[\u0300-\u036f"'`´‘’“”:]/g, "");
      this.router.navigate(['/categoria', categoryNameWithDashes]);
    }
  }

  toggleSubcategories(category: any, isHovered: boolean): void {
    this.showSubcategories[category.id] = isHovered;
  }

  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.showCategories = false;
    this.updateToggleState();
  }

  private updateToggleState(): void {
    const smallViewport = window.innerWidth <= 768;
    this.showCategories = !smallViewport;
  }

}
