import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { Item } from '../../models/item.model';
import { FormsModule } from '@angular/forms';
import { MeasureUnit } from '../../models/measure.model';
import { CategoryService } from '../../service/categoriy.service';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-editor-dialog',
  imports: [FormsModule, CommonModule],
  templateUrl: './item-editor-dialog.component.html',
  styleUrl: './item-editor-dialog.component.css',
  standalone: true,
})
export class ItemEditorDialogComponent {

  private dialogRef = inject(DialogRef<Item|null>);
  data = inject(DIALOG_DATA) as Item;
  
  item: Item = {
    ...this.data,
    articleMeasure: this.data.articleMeasure ?? { unit: MeasureUnit.CM, height: 0, width: 0, length: 0 },
    packedMeasure: this.data.packedMeasure ?? { unit: MeasureUnit.CM, height: 0, width: 0, length: 0 },
    category: this.data.category ?? { id: '', name: '', description: '' }
  };
  isEdit = !!(this.data.name || this.data.description);

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  save() {
    this.dialogRef.close(this.item);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
