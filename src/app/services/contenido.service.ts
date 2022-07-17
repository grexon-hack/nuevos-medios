import { Injectable } from '@angular/core';
import { ContenidoModel } from '../models/Contenido.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {
  private data: ContenidoModel[] = [];
  private detailContent = new BehaviorSubject<any[]>([]);

  detailContent$ = this.detailContent.asObservable();

  constructor(private firestore: AngularFirestore) { }


  listarContenido(): Observable<any> {
    return this.firestore.collection('contenido', ref => ref.orderBy('name', 'desc')).snapshotChanges();
  }

  dataTranfer(content: ContenidoModel) {
    this.data.push(content);
    this.detailContent.next(this.data)
  }

  filterByCategory(data: string): Observable<any> {
    return this.firestore.collection('contenido', ref => ref.where('category', '==', data)).snapshotChanges();
  }


}
