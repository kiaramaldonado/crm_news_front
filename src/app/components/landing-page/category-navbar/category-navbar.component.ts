import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  constructor(private router: Router) { };


  ngOnInit() {
    console.log(this.categories, 'Esta es la buena');

  }
  emitCategorySelection(category: Category | null): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }

  hasSubcategories(parentId: number | null): boolean {
    return this.categories.some(category => category.parent_id === parentId);
  }

  getSubcategories(parentId: number | null): Category[] {
    return this.categories.filter(category => category.parent_id === parentId);
  }

  navigateToCategory(event: Event, category: any): void {
    if (category === null) {
      this.router.navigate(['/guirre']);
      this.emitCategorySelection(null);
    } else {
      event.stopPropagation(); // Stop the event propagation
      const route = category.parent_id === null ? '/guirre' : '/guirre';
      const categoryNameWithDashes = category.name.toLowerCase().replace(/[,\s]+/g, '-').normalize("NFD").replace(/[\u0300-\u036f"'`´‘’“”:]/g, "");
      this.router.navigate(['/category', category.name.toLowerCase()]);

      // this.emitCategorySelection(category);
    }
  }


  // Toggle to show or not show the subcategories
  showSubcategories: { [categoryId: number]: boolean } = {};

  toggleSubcategories(category: any, isHovered: boolean): void {
    this.showSubcategories[category.id] = isHovered;
  }

}
