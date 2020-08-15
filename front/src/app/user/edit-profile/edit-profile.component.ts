import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: User = new User({});
  busy: any;
  @ViewChild("imageUploader") imageUploader: any;

  constructor(
    private authService:AuthService, 
    public userService:UserService,
    private toast: ToastrService) { 
    let user = this.authService.currentUser(); 
    
    Object.assign(this.user, user);
  }

  ngOnInit(): void {
  }

  profilePicture(e) {
    let s = e.database_file_name.split('/');
    this.user.image = s[s.length-1];
  }

  imageUserSelect() {
    this.imageUploader.onClick();
  }

  save() {
    this.busy = this.userService.updateProfile(this.user).subscribe(res => {
      this.authService.setCurrentUser(this.user);
      this.toast.success('¡Actualizado!', '¡Los datos se actualizaron! :)')
    })
  }


  password:string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';
  updatePassword() {
    if (this.newPassword != this.repeatNewPassword) {
      this.toast.error('Error', 'Las contraseñas no coinciden');
      return ;
    }
    this.busy = this.userService.updatePassword(this.password, this.newPassword).subscribe(res => {
      this.toast.success('¡Correcto!', 'La contraseña se cambió correctamente');
      this.password = '';
      this.newPassword = '';
      this.repeatNewPassword = '';
    }, error => {
      if (error.error.code == 1050) {
        this.toast.error('Error', 'La contraseña es incorrecta');
      } else {
        this.toast.error('Error', 'Ocurrió un error actualizando la contraseña');
      }
    })

  }

}
