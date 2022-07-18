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
      email : ['', Validators.required],
      password : ['', Validators.required],
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
      this.loading = true;
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.toastr.success('User was successfully registered', 'Exit!')
        this.route.navigate(['/login']);
      }).catch((error) => {
        this.loading = false;
        this.toastr.error(this.firebaseError(error.code), 'Error');
      })
    }

  }

  firebaseError(code: string) {
    switch(code){
      case 'auth/email-already-in-use':
        return 'User already exists';
      case 'auth/weak-password':
        return 'weak password';
      case 'auth/invalid-email':
        return 'Invalid Email';
      default:
        return "unknown error";
    }
  }

}
