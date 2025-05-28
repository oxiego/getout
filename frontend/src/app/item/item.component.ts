import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../models/item.model';
import { MeasureUnit } from '../models/measure.model';
import { ItemService } from '../service/item.service';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ItemEditorDialogComponent } from './item-editor-dialog/item-editor-dialog.component';
import { Category } from '../models/category.model';
import { CategoryService } from '../service/categoriy.service';

@Component({
  selector: 'app-item',
  imports: [FormsModule, CommonModule, DialogModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  standalone: true
})
export class ItemComponent implements OnInit, AfterViewInit {

  items: Item[] = [];
  confirmDeleteIndex: number | null = null;
  isLoading = true;
  categories: Category[] = [];

  constructor(private itemService: ItemService, 
    private categoryService: CategoryService,
    private dialog: Dialog) { }
  activeCategory: Category | null = null;

  ngOnInit(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });
    this.itemService.getItems().subscribe({
      next: (items) => {
        console.log('Categories:', items);
        this.items = items;
      }
    });
  }

  ngAfterViewInit(): void {
    const target = document.querySelector('app-root'); // oder dein Container-Element
    if (!target) {
      this.isLoading = false;
      return;
    }

    const observer = new MutationObserver(() => {
      // kurze Pause abwarten, ob DOM-Änderungen aufhören
      clearTimeout((observer as any)._timer);
      (observer as any)._timer = setTimeout(() => {
        this.isLoading = false;
        observer.disconnect();
      }, 300); // 300ms Ruhe = fertig
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  }

  setCategoryFilter(category: Category | null): void {
    this.activeCategory = category;
  }

  getFilteredItems(): Item[] {
    if (!this.activeCategory) return [];
    return this.items.filter(item => item.category?.id === this.activeCategory?.id);
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
          this.items.splice(this.confirmDeleteIndex !== null ? this.confirmDeleteIndex : -1, 1);
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
