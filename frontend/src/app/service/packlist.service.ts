import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Packlist } from '../models/packlist';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacklistService {

  constructor(private http:HttpClient) { }

  URL = environment.apiBaseUrl + 'packlists';

  getPacklists():Observable<Packlist[]> {
    return this.http.get<Packlist[]>(this.URL);
  }

  savePacklist(packlist: Packlist): Observable<Packlist> {
    return this.http.post<Packlist>(this.URL, packlist);
  }

  getPacklist(uuid: string): Observable<Packlist> {
    return this.http.get<Packlist>(`${this.URL}/${uuid}`);
  }

  deletePacklist(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${uuid}`);
  } 
}
