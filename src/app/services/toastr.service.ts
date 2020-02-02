import { ToastrService as extToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ConfirmationService } from '@jaspero/ng-confirmations';

@Injectable()
export class ToastrService {
    options: any;

    constructor(public toastr: extToastrService, public confirm: ConfirmationService) {
    }

    success(title, text) {
      this.toastr.success(text, title);
    }

    error(title, text) {
      this.toastr.error(text, title);
    }

    warning(title, text) {
      this.toastr.warning(text, title);
    }

    info(title, text) {
      this.toastr.info(text, title);
    }

    modal(title, text, okText:string = 'Aceptar', declineText:string = 'Cancelar') {
      if (!document.getElementsByTagName("jaspero-confirmations")[0].classList.contains('hide-modal-cancel') && declineText == '')
        document.getElementsByTagName("jaspero-confirmations")[0].className += ' hide-modal-cancel';

      let config = {
        confirmText: okText,
        declineText: declineText,
        overlayClickToClose: false
      }
      let s = new Subject();
      let r = this.confirm.create(title, text, config);
      r.subscribe(res => {
        document.getElementsByTagName("jaspero-confirmations")[0].className = document.getElementsByTagName("jaspero-confirmations")[0].className.replace("hide-modal-cancel","");
        if (res.resolved)
          s.next(true);
        else
          s.next(false);
      })
      return s;
    }

    dismissModal() {
      let buttons = document.getElementsByClassName('jaspero__confirmation_dialog-actions')[0];
      if (buttons) (buttons.childNodes[2] as HTMLElement).click();
    }
}
