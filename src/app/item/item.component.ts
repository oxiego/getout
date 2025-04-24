import { CommonModule } from '@angular/common';
import { Component , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../models/item.model';
import { MeasureUnit } from '../models/measure.model';

@Component({
  selector: 'app-item',
  imports: [FormsModule, CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
  standalone: true
})
export class ItemComponent implements OnInit{

  newItem!: Item;
  items: Item[] = [];
  
  ngOnInit(): void {
    this.initNewItem()
    this.readLocal();
  }

  addItem() {
    this.items.push(this.newItem);
    this.initNewItem();
    this.storeLocal();
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.storeLocal
  }
    

  private storeLocal() : void {
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  private readLocal() : void {
    const items = localStorage.getItem('items');
    if (items) {
      this.items = JSON.parse(items);
    }
  }

  private initNewItem() : void {
    this.newItem = {
      id: '',
      name: '',
      manufacturer: '',
      articelLink: '',
      description: '',
      articleMeasure: {
        unit: MeasureUnit.CM,
        height: 0,
        width: 0,
        length: 0
      },
      packedMeasure: {
        unit: MeasureUnit.CM,
        height: 0,
        width: 0,
        length: 0
      },
      weight: 0,
      paidPrice: 0,
      category: {
        id: '',
        name: '',
        description: ''
      } 
    };
  }
}
