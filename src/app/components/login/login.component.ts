import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: FormGroup;
  loading:boolean= false;
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private route: Router
    ) { 
    this.loginUser = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  handlerLoginSubmit() {
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(() => {
      this.route.navigate(['/']);
      this.toastr.success('to the application NuevosMedios', 'Welcome')
    })
    .catch((error) => {
      this.loading = false;
      this.toastr.error(error.code.slice(5).replaceAll('-', ' '), 'Error');
    })
  }

}
