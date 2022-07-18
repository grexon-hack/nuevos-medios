import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContenidoModel } from 'src/app/models/Contenido.model';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPost: FormGroup;
  loading:boolean = false;
  currentEmail:string | null | undefined;
  constructor(
    private fb: FormBuilder,
    private contenidoService: ContenidoService,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private route: Router
    ) { 
    this.createPost = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(35)]],
      image: ['', Validators.required],
      link: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.afAuth.currentUser.then(data => this.currentEmail = data?.email)
  }

  dispathCreatorPost() {
    this.loading = true;
    const CONTENT: ContenidoModel = {
      name : this.createPost.value.name,
      title: this.createPost.value.title,
      category: this.createPost.value.category,
      description: this.createPost.value.description,
      image:this.createPost.value.image,
      link: this.createPost.value.link,
      email: this.currentEmail,
      creationDate: new Date()
    }

    this.contenidoService.createContent(CONTENT)
    .then(() => {
      this.loading = false;
      this.toastr.success('Your publication has been shared with satisfaction', this.currentEmail || 'Hey!');
      this.createPost.reset();
      this.route.navigate(['/']);
    })
    .catch((error) => {
      this.loading = false;
      this.toastr.error(error.message, 'Error!')
    })
  }

}
