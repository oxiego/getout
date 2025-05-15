import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemComponent } from "./item/item.component";
import { CategoryComponent } from "./category/category.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ItemComponent, CategoryComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent {
  title = 'GetOutFE';
}
