import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  currentFilter = [];
  lengthArray:number;

  handlerChange(event: any) {
    this.currentFilter = event;
  }

  handlerLengthArray(event: number) {
    this.lengthArray = event;
  }

  constructor(
    ) {}

  ngOnInit(): void {
    
  }

}
