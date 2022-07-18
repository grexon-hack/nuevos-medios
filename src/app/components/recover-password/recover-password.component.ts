import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoverUser: FormGroup;
  loading:boolean= false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private route: Router
  ) {
    this.recoverUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
   }

  ngOnInit(): void {
  }

  recoverPassword() {
    const email = this.recoverUser.value.email;
    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email)
    .then(() => {
      this.toastr.info('We have sent an email to reset the password', 'Info!')
      this.route.navigate(['/login']);
    })
    .catch((error)=> {
      this.loading = false;
      this.toastr.error(error.code.slice(5).replaceAll('-', ' '), 'Error');
    })
  }

}
