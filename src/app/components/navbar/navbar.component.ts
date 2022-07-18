import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userActive:boolean = false;
  constructor(
    private afAuth: AngularFireAuth,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then( user => {
      if(user && user.emailVerified) {
        this.userActive = true;
      }
    })
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.userActive = false;
      this.route.navigate(['/'])
    })
  }

}
