import { Component, OnInit } from '@angular/core';
import { ContenidoModel } from 'src/app/models/Contenido.model';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  listCategories:string[] = [];
  constructor(private contentService: ContenidoService) { }

  ngOnInit(): void {
    this.getListCategories();
  }

  getListCategories(){
    this.contentService.listarContenido()
    .subscribe(data => {
      this.listCategories = [];
      data.forEach((item: any) => {
        if(!this.listCategories.includes(item.payload.doc.data().category)) {

          this.listCategories.push(item.payload.doc.data().category)
        }
      })
    })
  }
}
