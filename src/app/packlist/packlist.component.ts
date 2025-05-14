import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../service/item.service';
import { CategoryService } from '../service/categoriy.service';
import { Category } from '../models/category.model';
import { Item } from '../models/item.model';
import { FormsModule } from '@angular/forms';
import { Packlist } from '../models/packlist';
import { Dialog } from '@angular/cdk/dialog';
import { PacklistOpenDialogComponent } from './packlist-open-dialog/packlist-open-dialog.component';

@Component({
  selector: 'app-packlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './packlist.component.html',
  styleUrls: ['./packlist.component.css']
})
export class PacklistComponent {
  categoryAll:Category = {
    id: "0",
    name: 'All',
    description: 'All items'
  };

  packlistName = 'My Packing List';

  availablePacklists : Packlist [] = [ ];

  categories:Category[] = [];
  selectedFilters = new Set<string>();

  allItems:Item[] = [];

  availableItems:Item[] = [...this.allItems]; // initial alles links
  packlistItems: any[] = [];

  constructor(
    private categoryService: CategoryService, 
    private itemService: ItemService,
    private dialog: Dialog
  ) {  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });
    this.itemService.getItems().subscribe({
      next: (items) => {
        this.allItems = items;
        this.availableItems = [...this.allItems]; // initial alles links
        }
      });
  }

  toggleFilter(category: Category) {
    if (category.name === 'All') {
      this.selectedFilters.clear();
      this.selectedFilters.add('All');
    } else {
      if (this.selectedFilters.has('All')) {
        this.selectedFilters.delete('All');
      }
      this.selectedFilters.has(category.name)
        ? this.selectedFilters.delete(category.name)
        : this.selectedFilters.add(category.name);
    }
  }

  isActive(category: Category): boolean {
    return this.selectedFilters.has(category.name) ||
      (category.name === 'All' && this.selectedFilters.has('All')) ||
      (this.selectedFilters.size === 0 && category.name === 'All');
  }

  getFiltered(items: Item[]) {
    if (this.selectedFilters.size === 0 || this.selectedFilters.has('All')) {
      return items;
    }
    return items.filter(item => this.selectedFilters.has(item.category? item.category.name:this.categoryAll.name));
  }

  moveToPacklist(item: Item) {
    this.availableItems = this.availableItems.filter(i => i !== item);
    this.packlistItems.push(item);
  }

  moveToSelected(item: Item) {
    this.packlistItems = this.packlistItems.filter(i => i !== item);
    this.availableItems.push(item);
  }

  openDialog() {
   this.dialog
    .open(PacklistOpenDialogComponent, {
      data: this.availablePacklists,
    })
    .closed
    .subscribe(result => {
      if (result) {
        this.loadPacklist(result);
      }
    });
}

closeDialog() {
  // Dialog schließen
}

loadPacklist(list: any) {
  this.packlistName = list.name;
  this.packlistItems = [...list.items];
  this.availableItems = this.allItems.filter(item => !this.packlistItems.includes(item));
  this.closeDialog();
}

savePacklist() {
  // Implementiere Speichern (lokal oder API)
  console.log('Saved:', this.packlistName, this.packlistItems);
}
}
