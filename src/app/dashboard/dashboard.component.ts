import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddComponent } from '../add/add.component';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';
import { MypasswordBackendService } from '../services/mypassword-backend.service';
import { passwordList } from '../model/passwordListModel';
import { AuthService } from '../services/auth-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // Global Var
  public addModal: MdbModalRef<AddComponent> | null = null;
  public editModal: MdbModalRef<EditComponent> | null = null;
  public deleteModal: MdbModalRef<DeleteComponent> | null = null;
  public showBanner: boolean = false;
  public passwordList: passwordList[] = [{}];
  public searchFilter: string = '';
  public tableLoading: boolean = true;
  public noteSuccess: boolean = false;
  public noteDanger: boolean = false;

  constructor(
    private modalService: MdbModalService,
    private passwordApiServices: MypasswordBackendService,
    private authServices: AuthService
  ) {
    this.getPassword();
  }

  ngOnInit(): void {
    this.tableLoading = true;
  }

  addApplication() {
    this.addModal = this.modalService.open(AddComponent);
    this.addModal.onClose.subscribe((response) => {
      if (response === true) {
        this.noteSuccess = response;
        setTimeout(() => { this.noteSuccess = false }, 3000);
      } else {
        this.noteDanger = response;
        setTimeout(() => { this.noteDanger = false }, 3000);
      }
    });
  }

  editApplication(passwordEdit: passwordList) {
    this.editModal = this.modalService.open(EditComponent, {
      data: { passwordEdit: passwordEdit },
    });

    this.editModal.onClose.subscribe((response) => {
      if (response === true) {
        this.noteSuccess = response;
        setTimeout(() => { this.noteSuccess = false }, 3000);
      } else {
        this.noteDanger = response;
        setTimeout(() => { this.noteDanger = false }, 3000);
      }
    });
  }

  deleteApplication(passwordDelete: passwordList) {
    this.deleteModal = this.modalService.open(DeleteComponent, {
      data: { passwordDelete: passwordDelete },
    });
    this.deleteModal.onClose.subscribe((response) => {
      if (response === true) {
        this.noteSuccess = response;
        setTimeout(() => { this.noteSuccess = false }, 3000);
      } else { 
        this.noteDanger = response;
        setTimeout(() => { this.noteDanger = false }, 3000);
      }
    });
  }

  getPassword() {
    this.tableLoading = true;
    this.passwordApiServices.getPasswordList().subscribe((response) => {
      this.passwordList = response.map((document) => {
        return {
          id: document.payload.doc.id,
          ...(document.payload.doc.data() as {}),
        };
      });

      this.tableLoading = false;
    });
  }

  copyToClipboard(data: any) {
    const htmlElement = document.createElement('textarea');
    htmlElement.value = data;
    document.body.appendChild(htmlElement);
    htmlElement.select();
    document.execCommand('copy');
    document.body.removeChild(htmlElement);
  }

  logout() {
    this.authServices.SignOut();
  }
}
