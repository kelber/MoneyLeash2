import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

@Component({
  selector: 'page-pickaccountto',
  templateUrl: 'pickaccountto.html'
})

export class PickAccountToPage {
  
  accounts: FirebaseListObservable<any>;
  itemselected: string;
  equalToSubject: Subject<any>;
  orderByChild: Subject<any>;
  startTime;
  elapsedTime;
   
  constructor(
      public nav: NavController,
      public userData: UserData,
      public transactionData: TransactionData) {}

  ionViewDidLoad() {

    this.equalToSubject = new BehaviorSubject(null);
    this.orderByChild = new BehaviorSubject('accounttype');
    this.accounts = this.userData.getAccounts(this.orderByChild, this.equalToSubject);
    this.accounts.first().subscribe(snapshots => {
      this.userData.LoadingControllerDismiss();
      this.itemselected = this.transactionData.getAccountTo();
      this.elapsedTime = Date.now() - this.startTime;
      //console.log(this.elapsedTime);
    });

  }
  
  pickPreference(account) {
    this.transactionData.setReferrer('PickAccountToPage');
    this.transactionData.setAccountTo(account.accountname);
    this.transactionData.setAccountToId(account.$key);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }
}