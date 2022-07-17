import { Component, OnInit } from '@angular/core';
import { ContenidoModel } from 'src/app/models/Contenido.model';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-card-contenido',
  templateUrl: './card-contenido.component.html',
  styleUrls: ['./card-contenido.component.css']
})
export class CardContenidoComponent implements OnInit {
  listContent: ContenidoModel[] = [];
  constructor(private contentService: ContenidoService) { }

  ngOnInit(): void {
    this.getAllContent();
    
  }

  getAllContent() {
    this.contentService.listarContenido()
    .subscribe(data => {
      this.listContent = [];
      data.forEach((element: any) => {
        this.listContent.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  sendingContent(content: ContenidoModel) {
    this.contentService.dataTranfer(content);
  }

}
