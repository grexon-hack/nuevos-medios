import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { ContenidoModel } from 'src/app/models/Contenido.model';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {
  myPosts:ContenidoModel[] = [];
  currentEmail:string | null | undefined;
  constructor(
    private contentService: ContenidoService,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    try {
      this.afAuth.currentUser.then(data => this.currentEmail = data?.email)
      .then(() => this.contentService.getContentByEmail(this.currentEmail)
      .subscribe((data: any) => {
        this.myPosts = [];
        data.forEach((element:any) => {
          this.myPosts.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
      })
      )
    } catch {
      console.log('Error')
    }
  }

  deletePost(id: string | undefined) {
    this.contentService.deleteContent(id)
    .then(() => this.toastr.info('Your post have been deleted successfully', 'Deleted!'))
    .catch(() => this.toastr.error('Opss... Something has gone wrong', 'Error!'))
  }
  sendingContent(content: ContenidoModel) {
    this.contentService.dataTranfer(content);
  }

}
