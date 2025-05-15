import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Category } from '../models/category.model';

@Component({
  standalone: true,
  selector: 'app-category-editor-dialog',
  imports: [FormsModule],
  template: `
    <h2 class="text-center">{{ isEdit ? 'Edit Category' : 'Add Category' }}</h2>
    <div class="form-group mt-3">
      <label>Name</label>
      <input [(ngModel)]="category.name" class="form-control" />
    </div>
    <div class="form-group mt-3">
      <label>Description</label>
      <input [(ngModel)]="category.description" class="form-control" />
    </div>
    <div class="d-flex justify-content-between mt-4">
      <button class="btn btn-secondary w-45" (click)="cancel()">Cancel</button>
      <button class="btn btn-primary w-45" (click)="save()">Save</button>
    </div>
  `,
})
export class CategoryEditorDialogComponent {
  
  private dialogRef = inject(DialogRef<Category|null>);
  data = inject(DIALOG_DATA) as Category;
  category:Category = { ...this.data };
  isEdit = !!(this.data.name || this.data.description);
 
  

  save() {
    this.dialogRef.close(this.category);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
