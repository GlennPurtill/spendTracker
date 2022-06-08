import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Expenses } from 'src/app/shared/services/expenses';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  description = ""
  cost = ""
  type = ""
  note = ""
  currency = ""
  // expenseData: any;
  constructor(private http: HttpClient,public authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    if(!(this.authService.isLoggedIn)){
      this.router.navigate(['/sign-in'])
    }
  }

  test(){
    
    this.http.post('http://localhost:5050/expense',
      {
        uid: this.authService.userData.uid,
        description: this.description,
        cost: this.cost,
        Currency: this.currency,
        Type: this.type,
        Note: this.note
      }, {responseType: 'text'}).subscribe(
        (val) => {
          console.log("Insert Successful")
        },
        response => {
          console.log("POST call in error", response);
        })
  }
}
