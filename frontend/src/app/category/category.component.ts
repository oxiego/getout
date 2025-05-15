import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../models/category.model';
import { CategoryService } from '../service/categoriy.service';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CategoryEditorDialogComponent } from './category-editor-dialog.component'; // Pfad ggf. anpassen


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,
    DialogModule,
    FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  confirmDeleteIndex: number | null = null;


  constructor(private categoryService: CategoryService, private dialog: Dialog) {

  }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe({
      next: (cats) => {
        console.log('Categories:', cats);
        this.categories = cats;
      }
    });
  }

  openAddDialog() {
    this.dialog.open(CategoryEditorDialogComponent, {
      data: { name: '', description: '' }
    }).closed.subscribe(result => {
      const category = result as Category | null;
      if (category) {
        this.categoryService.addCategory(category).subscribe({
          next: (cat) => {
            this.categories.push(cat);
          },
          error: (err) => {
            console.error('Error adding category:', err);
          }
        });
      }
    });
  }

  openEditDialog(category: Category, index: number) {
    this.dialog.open(CategoryEditorDialogComponent, {
      data: { ...category }
    }).closed.subscribe(result => {
      const updated = result as Category | null;
      if (updated) {
        this.categoryService.putCategory(updated).subscribe({
          next: (cat) => {
            this.categories[index] = cat;
          },
          error: (err) => {
            console.error('Error updating category:', err);
          }
        });
      }
    });
  }



  deleteCategory(index: number) {
    this.confirmDeleteIndex = index;
  }
  cancelDelete() {
    this.confirmDeleteIndex = null;
  }

  confirmDelete() {
    if (this.confirmDeleteIndex !== null) {
      const categoryToDelete = this.categories[this.confirmDeleteIndex];
      this.categoryService.deleteCategory(categoryToDelete.id).subscribe({
        next: () => {
          this.categories.splice(this.confirmDeleteIndex!==null ? this.confirmDeleteIndex  : -1, 1);
          this.confirmDeleteIndex = null;
        },
        error: (err) => {
          console.error('Error deleting category:', err);
          this.confirmDeleteIndex = null;
        }
      });
    }
  }


}
