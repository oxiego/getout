import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../service/item.service';
import { CategoryService } from '../service/categoriy.service';
import { Category } from '../models/category.model';
import { Item } from '../models/item.model';
import { FormsModule } from '@angular/forms';
import { Packlist } from '../models/packlist';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { PacklistOpenDialogComponent } from './packlist-open-dialog/packlist-open-dialog.component';
import { PacklistService } from '../service/packlist.service';

@Component({
  selector: 'app-packlist',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule],
  templateUrl: './packlist.component.html',
  styleUrls: ['./packlist.component.css']
})
export class PacklistComponent {

  categoryAll: Category = {
    id: "0",
    name: 'All',
    description: 'All items'
  };

  //packlistName = '';
  //packlistItems: any[] = [];
  currentPacklist: Packlist = {
    name: "",
    items: []
  };

  availablePacklists: Packlist[] = [];

  categories: Category[] = [];
  private selectedFilters = new Set<string>();
  private allItems: Item[] = [];

  availableItems: Item[] = [...this.allItems]; // initial alles links

  uuidToDelete: string | null = null;

  private pressTimer: ReturnType<typeof setTimeout> | null = null;
  private longPressTriggered = false;
  private readonly LONG_PRESS_DELAY = 500;
  showFilters = false;


  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService,
    private packlistService: PacklistService,
    private dialog: Dialog
  ) { }

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

    this.readPacklists(true);
  }

  readPacklists(init: boolean = false) {
    this.packlistService.getPacklists().subscribe({
      next: (packlists) => {
        this.availablePacklists = packlists;
        if (init && this.availablePacklists.length > 0) {
          this.loadPacklist(this.availablePacklists[0]); // Lade die erste Packliste beim Start
        }
      }
    });
  }

  startPressToggleFilter(category: Category, event: MouseEvent | TouchEvent): void {
    const mouseEvent = event as MouseEvent;
    const isCtrlPressed = mouseEvent.ctrlKey || mouseEvent.metaKey;
    if (event instanceof TouchEvent) {
      event.preventDefault();
    }
    if (isCtrlPressed) {
      this.toggleFilter(category);
      return;
    }
    this.longPressTriggered = false;
    this.pressTimer = setTimeout(() => {
      this.longPressTriggered = true;
      this.toggleFilter(category); // Multi-Select bei Long Press
    }, this.LONG_PRESS_DELAY);
  }

  endPressToggleFilter(category: Category, event: MouseEvent | TouchEvent): void {
    const mouseEvent = event as MouseEvent;
    const isCtrlPressed = mouseEvent.ctrlKey || mouseEvent.metaKey;
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
      this.pressTimer = null;
    }

    if (!this.longPressTriggered) {
      const mouseEvent = event as MouseEvent;
      const isCtrlPressed = mouseEvent.ctrlKey || mouseEvent.metaKey;
      if (isCtrlPressed) {
        this.toggleFilter(category); // redundante Absicherung
      } else {
        // normaler Klick (Single-Select)
        this.selectedFilters.clear();
        this.toggleFilter(category);
      }
    }
  }

  cancelPressToggleFilter(): void {
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
      this.pressTimer = null;
    }
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
    return items.filter(item => this.selectedFilters.has(item.category ? item.category.name : this.categoryAll.name));
  }

  moveToPacklist(item: Item) {
    this.availableItems = this.availableItems.filter(i => i !== item);
    this.currentPacklist.items.push(item);
  }

  moveToSelected(item: Item) {
    this.currentPacklist.items = this.currentPacklist.items.filter(i => i !== item);
    this.availableItems.push(item);
  }

  openDialog() {
    this.readPacklists();
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
    this.currentPacklist.name = list.name;
    this.currentPacklist.items = [...list.items];
    this.availableItems = this.allItems.filter(item => !this.currentPacklist.items.includes(item));
    this.currentPacklist = list
    this.closeDialog();
  }

  savePacklist() {
    this.packlistService.savePacklist(this.currentPacklist).subscribe({
      next: (savedPacklist) => {
        const existingIndex = this.availablePacklists.findIndex(pl => pl.name === savedPacklist.name);
        this.currentPacklist = savedPacklist;
        if (existingIndex !== -1) {
          this.availablePacklists[existingIndex] = savedPacklist; // Update existing packlist 
        }
      }
    });
  }

  newPacklist() {
    this.currentPacklist = {
      name: "",
      items: []
    };
  }

  deletePacklist() {
    if (this.currentPacklist.uuid) {
      this.uuidToDelete = this.currentPacklist.uuid;
    }
  }
  cancelDelete() {
    this.uuidToDelete = null;
  }

  confirmDelete() {
    if (this.uuidToDelete !== null) {
      this.packlistService.deletePacklist(this.uuidToDelete).subscribe({
        next: () => {
          this.availablePacklists = this.availablePacklists.filter(pl => pl.uuid !== this.uuidToDelete);
          this.uuidToDelete = null;
          this.newPacklist(); // Reset current packlist
        },
        error: (err) => {
          console.error('Error deleting packlist:', err);
          this.uuidToDelete = null; 
        }
      });
    }
  }
}


