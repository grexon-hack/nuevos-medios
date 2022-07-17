import { Component, OnInit } from '@angular/core';
import { ContenidoModel } from 'src/app/models/Contenido.model';
import { ContenidoService } from 'src/app/services/contenido.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  detail:ContenidoModel[]=[];

  userId:string;
  contentData:string= '';

  constructor(
    private contentService: ContenidoService
  ) { }

  ngOnInit(): void {
    this.contentService.detailContent$.subscribe(data => {
      data.forEach((last, index) => {
        if(index === data.length - 1) {
          this.detail.push(last)
        }
      })
    })
  }
  
}
