import { Injectable } from '@angular/core';
import { Permission } from '../models/permission';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  accesses: Permission[];
  roleOrder = {
      'student': 1,
      'instructor': 2,
      'admin': 3
    };

  constructor(
    private authService: AuthService
  ) {
  }

  deleteAccesses(){
    this.accesses = null;
  }
  async load() {
    await this.authService.getAccesses().then((res : Permission[]) => {
      this.accesses = res;
    }) 
  }

  async role(courseId)  {
    let r;
    if (!this.accesses) {
      await this.load();
    }
    for(let a of this.accesses) {
      if (a.over_id == courseId || a.over == 'all') {
        if (r)
          r = (this.roleOrder[a.role] > this.roleOrder[r]) ? a.role : r;
        else
          r = a.role;
      }
    }
    return r;
  }
}
