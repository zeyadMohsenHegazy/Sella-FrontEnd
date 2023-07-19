import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRegister } from '../Model/iregister';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../Model/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private apiUrl = 'http://localhost:49182/api/User';
  private FullName = new BehaviorSubject<string> ("");
  constructor(private http: HttpClient) { }

  public GetFullNameFromStore(){
    return this.FullName.asObservable();
  }

  public SetFullNameForStore(_fullName : string){
    this.FullName.next(_fullName);
  }

  getUserById(id: number): Observable<IUser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IUser>(url);
  }

}
