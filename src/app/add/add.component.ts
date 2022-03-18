import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { passwordList } from '../model/passwordListModel';
import { MypasswordBackendService } from '../services/mypassword-backend.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  // Global Var
  public passwordList: passwordList = new passwordList();
  public confirmPassword: string = '';
  public notMatch: boolean = false;

  constructor(
    public addModal: MdbModalRef<AddComponent>,
    private passwordApiServices: MypasswordBackendService
  ) {}

  ngOnInit(): void {}

  addData(data: passwordList) {
    if (this.confirmPassword === data.appPassword) {
      const passwordData: passwordList = {
        appName: data.appName,
        appUser: data.appUser,
        appPassword: data.appPassword,
        lastUpdatedBy: 'Farhan',
        lastUpdatedDate: new Date(),
      };

      this.passwordApiServices
        .addPassword(passwordData)
        .then(() => this.addModal.close(true)).catch(() => { this.addModal.close((false)); });
        this.notMatch = false;
    } else {
      this.notMatch = true;
    }
  }
}
