import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  

  URL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.URL + 'categories');
  }
  
  addCategory(category: Category) :Observable<Category> {
    return this.http.post<Category>(this.URL + 'categories', category);
  }

  putCategory(category: Category) :Observable<Category> {
    return this.http.put<Category>(this.URL + 'categories/' + category.id, category);
  }

  deleteCategory(id: string)  {
    return this.http.delete(this.URL + 'categories/' + id);
  }
  
}
