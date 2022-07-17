import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ContenidoModel } from 'src/app/models/Contenido.model';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-card-contenido',
  templateUrl: './card-contenido.component.html',
  styleUrls: ['./card-contenido.component.css']
})
export class CardContenidoComponent implements OnInit {
  listContent: ContenidoModel[] = [];

  @Input() filterContent:ContenidoModel[];

  constructor(private contentService: ContenidoService) { }

  ngOnInit(): void {
     this.getAllContent();

  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.filterContent.length) {
      this.getFilterContent(this.filterContent)
    }else {
      this.getAllContent();
    }
  }

  getFilterContent(data: any) {
    this.listContent = [];
      data.forEach((resp: any)=> {
        this.listContent.push({
          id:resp['payload'].doc.id,
          ...resp['payload'].doc.data()
        })
      })
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
