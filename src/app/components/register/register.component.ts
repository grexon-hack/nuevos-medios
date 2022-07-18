import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error:string='';
  registerUser: FormGroup;
  loading:boolean= false;
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private route: Router
    ) { 
    this.registerUser = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword : ['', Validators.required]

    })
  }

  ngOnInit(): void {
  }

  register() {
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const repeatPassword = this.registerUser.value.repeatPassword;

    if(password !== repeatPassword) {
      this.error = "Passwords don't match";
    } else {
      this.error = '';
      this.loading = true;
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.verifyEmail();
      }).catch((error) => {
        this.loading = false;
        this.toastr.error(error.code.slice(5).replaceAll('-', ' '), 'Error');
      })
    }

  }

  verifyEmail() {
    this.afAuth.currentUser.then( user => user?.sendEmailVerification())
    .then(() => {
      this.toastr.success('We have an email for your verification as a user', 'Information!')
      this.route.navigate(['/login']);
    })
  }

}
