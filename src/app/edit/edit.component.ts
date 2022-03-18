import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { passwordList } from '../model/passwordListModel';
import { MypasswordBackendService } from '../services/mypassword-backend.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public passwordEdit: passwordList = new passwordList();
  public passwordObj: passwordList = new passwordList();
  public confirmPassword: string = '';
  public notMatch: boolean = false; 

  constructor(
    public editModal: MdbModalRef<EditComponent>,
    private passwordApiServices: MypasswordBackendService
  ) {}

  ngOnInit(): void {
    this.passwordObj = {
      appName: this.passwordEdit.appName,
      appUser: this.passwordEdit.appUser,
      appPassword: this.passwordEdit.appPassword,
      id: this.passwordEdit.id,
      lastUpdatedBy: this.passwordEdit.lastUpdatedBy,
      lastUpdatedDate: this.passwordEdit.lastUpdatedDate,
    };
  }

  updateData(data: passwordList) {
    if (this.confirmPassword === data.appPassword) {
      const passwordData: passwordList = {
        appName: data.appName,
        appUser: data.appUser,
        appPassword: data.appPassword,
        lastUpdatedBy: 'Farhan',
        lastUpdatedDate: new Date(),
        id: this.passwordEdit.id,
      };

      this.passwordApiServices
        .updatePassword(passwordData)
        .then(() => this.editModal.close(true)).catch(() => { this.editModal.close(false); });
        this.notMatch = false;
    } else {
      this.notMatch = true;
    }
  }
}
