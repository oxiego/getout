import { CommonModule } from '@angular/common';
import { Component , HostListener, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../models/item.model';
import { MeasureUnit } from '../models/measure.model';
import { ItemService } from '../service/item.service';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ItemEditorDialogComponent } from './item-editor-dialog/item-editor-dialog.component';

@Component({
  selector: 'app-item',
  imports: [FormsModule, CommonModule, DialogModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  standalone: true
})
export class ItemComponent implements OnInit{

  items: Item[] = [];
  confirmDeleteIndex: number | null = null;

  constructor(private itemService: ItemService, private dialog: Dialog) {  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe({
      next: (items) => {
        console.log('Categories:', items);
        this.items = items;
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.altKey && event.key.toLowerCase() === 'a') {
      event.preventDefault(); // optional, falls z. B. Browsermenü reagieren würde
      this.openAddDialog();
    }
  }

  openAddDialog() {
    this.dialog.open(ItemEditorDialogComponent, {
      data: { name: '', description: '' }
    }).closed.subscribe(result => {
      const item = result as Item | null;
      if (item) {
        this.itemService.addItem(item).subscribe({
          next: (itemSaved) => {
            this.items.push(itemSaved);
          },
          error: (err) => {
            console.error('Error adding item:', err);
          }
        });
      }
    });
  }

  openEditDialog(item: Item, index: number) {
      this.dialog.open(ItemEditorDialogComponent, {
        data: { ...item }
      }).closed.subscribe(result => {
        const updated = result as Item | null;
        if (updated) {
          this.itemService.putItem(updated).subscribe({
            next: (updatedItem) => {
              this.items[index] = updatedItem;
            },
            error: (err) => {
              console.error('Error updating item:', err);
            }
          });
        }
      });
    }

  
    deleteItem(index: number) {
      this.confirmDeleteIndex = index;
    }
    cancelDelete() {
      this.confirmDeleteIndex = null;
    }
  
    confirmDelete() {
      if (this.confirmDeleteIndex !== null) {
        const itemToDelete = this.items[this.confirmDeleteIndex];
        this.itemService.deleteItem(itemToDelete.uuid).subscribe({
          next: () => {
            this.items.splice(this.confirmDeleteIndex!==null ? this.confirmDeleteIndex  : -1, 1);
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
