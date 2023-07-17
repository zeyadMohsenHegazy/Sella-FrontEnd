import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private FullName = new BehaviorSubject<string> ("");
  constructor() { }

  public GetFullNameFromStore(){
    return this.FullName.asObservable();
  }

  public SetFullNameForStore(_fullName : string){
    this.FullName.next(_fullName);
  }

}
