import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContenidoModel } from '../models/Contenido.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private data: ContenidoModel[] = [];
  private userLogin = new BehaviorSubject<any[]>([]);

  userLogin$ = this.userLogin.asObservable();

  constructor() { }

  loginUser(user: any) {
    this.data.push(user);
    this.userLogin.next(this.data)
  }
}
