import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// app pages
import { AccountPage } from '../account/account';

// services
import {UserData} from '../../../providers/user-data';

@Component({
  templateUrl: 'account-list.html'
})

export class AccountListPage {

  accounts: {};
  networth: any;

  constructor(
      public nav: NavController,
      public userData: UserData) {}

  ionViewDidLoad() {

    this.userData.getAllAccounts().on('value', (accounts) => {
      
      let rawList= [];
      var clearedBal = 0;
      var netWorth = 0;

      accounts.forEach( spanshot => {

        var account = spanshot.val();

        // Calculate Net Worth
        account.BalanceClass = '';
        clearedBal = parseFloat(account.balancecleared);
        netWorth = netWorth + clearedBal;
        if (clearedBal > 0) {
          account.BalanceClass = 'textGreen';
        } else if (clearedBal < 0){
          account.BalanceClass = 'textRed';
        } else {
          account.BalanceClass = 'textBlack';
        }

        // Build account array
        rawList.push({
          id: account.key,
          accountname: account.accountname,
          accounttype: account.accounttype,
          BalanceClass: account.BalanceClass,
          balancecleared: account.balancecleared,
          balancetoday: account.balancetoday,
          dateopen: account.dateopen
        });
      })

      this.accounts = rawList;
      this.networth = netWorth.toFixed(2);

    });
  }

  viewtransactions (account) {
    console.log('edit here');
    //this.nav.push(AccountPage, {paramSettings: this.userSettings});
  }

  createAccount() {
    this.nav.push(AccountPage, {paramAccount: 'New'});
  }
  
}