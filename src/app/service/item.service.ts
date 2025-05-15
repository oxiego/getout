import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  URL = environment.apiBaseUrl + 'items';

  constructor(private http: HttpClient) { }
  
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.URL);
  }
  
  addItem(item: Item) :Observable<Item> {
    return this.http.post<Item>(this.URL, item);
  }

  putItem(item: Item) :Observable<Item> {
    return this.http.put<Item>(this.URL + '/' + item.uuid, item);
  }

  deleteItem(id: string)  {
    return this.http.delete(this.URL + '/' + id);
  }
}
