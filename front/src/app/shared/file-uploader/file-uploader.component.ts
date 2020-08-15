import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';

import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {File as OurFile} from '../../models/file';
import { ToastrService } from '../../services/toastr.service';

import { environment } from 'src/environments/environment';
import { AwsService } from 'src/app/services/aws.service';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @ViewChild("fileUpload") fileUpload: ElementRef; 
  files = [];
  file: any = {};

  fileName: any;
  uploading:boolean = false;
  @Output() fileUploaded: EventEmitter<any>;
  @Input() maxInMb: number = 30;
  @Input() courseId: any;
  @Input() buttonText: string = 'Subir';

  @Input() uploadService: any; // service which has an function called "upload" where it will subir el archivo that the usuario has selected lolz 
  @Input() uploadMethod: string = 'upload'; // method in the susodicho service which handles the upload, normally called upload

  @Input() params: any = {};
  @Input() enabledExtensions: any;

  @Input() hideButton : boolean = false;

  @Input() crop: any;
  @Input() aspectRatio: any;
  @Input() height: any;
  @Input() width: any;
  appName: string = environment.appName;
  
  constructor(
    private toast: ToastrService,
    private awsService: AwsService
  ) {
    this.fileUploaded = new EventEmitter();
  }
  ngOnInit() {
  
  }

  uploadFile(file : any) {
    let ext = (file.data.name.split('.').pop());
    if (this.enabledExtensions && this.enabledExtensions.length && this.enabledExtensions.indexOf(ext) == -1) {
      this.toast.modal('Extensión incorrecta', 'El tipo de archivo no es admitido. Debe tener alguna de las siguientes extensiones: ' + this.enabledExtensions.join(', '));
      return ;
    }
    if (file.data.size > (this.maxInMb * 1024 * 1020) ) { // bigger than 30mb
      this.toast.modal('Muy pesado', 'El archivo no puede pesar más de ' + this.maxInMb + 'mb (╯°□°）╯︵ ┻━┻');
      return ;
    }

    if (this.crop) {
      let c = ImageCropperComponent
      let params = {
        file: file.data,
        aspectRatio: this.aspectRatio,
        width: this.width,
        height: this.height
      }
      this.toast.componentModal(c, params).subscribe(res => {
        if (res != 'cancel') {
          let imageBlob = this.dataURItoBlob(res);
          let convertedToFile = new File([imageBlob], file.data.name, { type: 'image/jpg' });
          file.data = convertedToFile;
          this.doUpload(file);
        } else {
          return ;
        }
      });
    } else {
      this.doUpload(file);
    }
  }

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});


}


  doUpload(file) {
    
    this.file.inProgress = true;
    this.uploading = true;
    let send = {
      size: file.data.size,
      file_name: file.data.name
    }
    for (let key in this.params) {
      send[key.toString()] = this.params[key];
    }

    this.uploadService[this.uploadMethod](send, this.courseId).subscribe((fileObject : any) => {
        this.awsService.uploadFile(file.data, fileObject.database_file_name, fileObject['credentials']).subscribe((event2 : any) => {
          if (event2.loaded < event2.total) {
            this.file.progress = Math.round(event2.loaded * 100 / event2.total);
          } 
          if (event2 == 'completed') {
            this.file.progress = 100;
            let emit = new OurFile(fileObject);
            this.fileUploaded.emit(emit);
            this.uploading = false;
          }
        });
            
            
      },
      (error: HttpErrorResponse) => {
        file.inProgress = false;
        this.toast.error('Error', 'Se produjo un error subiendo el archivo. Contactate con tu profesor del curso, o con el equipo de ' + this.appName);
        this.uploading = false;
        return of(`${file.data.name} upload failed.`);
        
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });

    this.files = [];
  }

  onClick() {
    if (this.uploading)
      return;
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  public reset() {
    this.file = {};
    this.uploading = false;
    this.files = []
  }


}
