import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionList } from '../enum';
import { passwordList } from '../model/passwordListModel';
@Injectable({
  providedIn: 'root',
})
export class MypasswordBackendService {
  constructor(private firestoreServices: AngularFirestore) {}

  addPassword(data: passwordList) {
    return new Promise<void>((resolve, reject) => {
      this.firestoreServices
        .collection(collectionList.passwordList)
        .add(data)
        .then(
          (res) => {
            resolve();
          },
          (err) => reject(err)
        );
    });
  }

  getPasswordList() {
    return this.firestoreServices
      .collection(collectionList.passwordList)
      .snapshotChanges();
  }

  updatePassword(data: passwordList) {
    return new Promise<void>((resolve, reject) => {
      this.firestoreServices
        .doc(collectionList.passwordList + '/' + data.id)
        .update({ ...data })
        .then(
          (res) => resolve(),
          (err) => reject(err)
        );
    });
  }

  deletePassword(data: passwordList) {
    return new Promise<void>((resolve, reject) => {
      this.firestoreServices
        .doc(collectionList.passwordList + '/' + data.id)
        .delete()
        .then(
          (res) => resolve(),
          (err) => reject(err)
        );
    });
  }
}
