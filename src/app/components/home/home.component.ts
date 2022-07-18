import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  currentFilter = [];

  handlerChange(event: any) {
    this.currentFilter = event;
  }

  constructor(
    private userData: AngularFireAuth,
    private userLogin: UserDataService
    ) {}

  ngOnInit(): void {
    this.userData.currentUser.then(data => {
      this.userLogin.loginUser({
        email: data?.email,
        id: data?.uid
      })
    })
  }

}
