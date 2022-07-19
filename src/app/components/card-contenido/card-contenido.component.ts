import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ContenidoModel } from 'src/app/models/Contenido.model';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-card-contenido',
  templateUrl: './card-contenido.component.html',
  styleUrls: ['./card-contenido.component.css']
})
export class CardContenidoComponent implements OnInit {
  listContent: ContenidoModel[] = [];
  isEmpty:boolean = false;
  @Input() filterContent:ContenidoModel[];
  @Output() lengthArray = new EventEmitter<number>();

  constructor(
    private contentService: ContenidoService
    ) { }

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
      if(data.length) {
        data.forEach((element: any) => {
          this.listContent.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
      }else {
        this.isEmpty = true;
      }
      this.lengthArray.emit(this.listContent.length);
    })
  }

  sendingContent(content: ContenidoModel) {
    this.contentService.dataTranfer(content);
  }
}
