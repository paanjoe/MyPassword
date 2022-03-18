import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { passwordList } from '../model/passwordListModel';
import { MypasswordBackendService } from '../services/mypassword-backend.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  public passwordDelete: passwordList = new passwordList();

  constructor(
    public deleteModal: MdbModalRef<DeleteComponent>,
    private passwordApiServices: MypasswordBackendService
  ) {}

  ngOnInit(): void {}

  deleteData() {
    this.passwordApiServices
      .deletePassword(this.passwordDelete)
      .then(() => this.deleteModal.close(true)).catch(() => { this.deleteModal.close(false); });
  }
}
