import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  newCategory!: Category;
  categories: Category[] = [];

  ngOnInit(): void {
    this.initNewCategory();
    this.readLocal();
  }

  addCategory() {
    this.categories.push(this.newCategory);
    this.initNewCategory();
    this.storeLocal();
  }

  deleteCategory(index: number) {
    this.categories.splice(index, 1);
    this.storeLocal();
  }

  private storeLocal(): void {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  private readLocal(): void {
    const stored = localStorage.getItem('categories');
    if (stored) {
      this.categories = JSON.parse(stored);
    }
  }

  private initNewCategory(): void {
    this.newCategory = {
      id: '',
      name: '',
      description: ''
    };
  }
}
