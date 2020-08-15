import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { IconComponent } from './icon/icon.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { RouterModule } from '@angular/router';

import { UiSwitchModule } from 'ngx-ui-switch';
import { ImageCropperModule } from 'ngx-image-cropper';

import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ErrorDisplayComponent } from './error-display/error-display.component';
import { LoadingDirective } from './loading.directive';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { EditableComponent } from './editable/editable.component';
import { FormsModule } from '@angular/forms';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBusyModule } from 'ng-busy';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ReorderComponent } from './reorder/reorder.component';

import { NgxSortableModule } from 'ngx-sortable';




import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';
import { ToastrService } from '../services/toastr.service';
import { EditPhotoDirective } from './edit-photo.directive';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';

@NgModule({
  declarations: [
    NavbarComponent, 
    IconComponent, 

    MenuComponent, 
    FooterComponent, 
    ErrorDisplayComponent, 
    LoadingDirective, 
    SkeletonComponent, 
    EditableComponent, 
    FileUploaderComponent, 
    ConfirmationModalComponent, 
    ReorderComponent, 
    EditPhotoDirective, 
    ProgressBarComponent,
    ImageCropperComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule.forRoot(),
    RouterModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule,
    NgbModalModule,
    NgBusyModule.forRoot({
        message: 'Cargando...',
        delay: 200,
        minDuration: 0,
    }),
    UiSwitchModule,
    NgxSortableModule,

    
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    FontAwesomeModule,
    ImageCropperModule
  ],
  exports: [
    NavbarComponent, 
    NgBusyModule, 
    FormsModule, 
    IconComponent, 
    MenuComponent, 
    FooterComponent, 
    ErrorDisplayComponent, 
    LoadingDirective, 
    EditPhotoDirective,
    SkeletonComponent, 
    CKEditorModule, 
    EditableComponent, 
    FileUploaderComponent, 
    ReorderComponent,
    UiSwitchModule,
    ProgressBarComponent,
  ],
  providers: [
    ToastrService
  ],
  entryComponents: [
    ConfirmationModalComponent,
    IconComponent,
    ImageCropperComponent
  ]
})
export class SharedModule {
  constructor(private library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIconPacks(far);
    library.addIconPacks(fab);
  }
}
