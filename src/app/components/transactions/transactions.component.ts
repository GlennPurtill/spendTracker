import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Expenses } from 'src/app/shared/services/expenses';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  userID = ""

  constructor(private http: HttpClient, public afAuth: AngularFireAuth,public authService: AuthService,private router: Router,private afs: AngularFirestore,private afDB: AngularFireDatabase) { 
    this.itemsRef = this.afDB.list('/8Rwvh05zebe9sbBYDKRcFRnZnY83/expense');
    this.items = this.itemsRef.valueChanges();
    // this.items.subscribe(values => {
    //   var i = 0;
    //   console.log(values[i])
    //   while(i<values.length){
    //     // console.log(values[i])
    //     i++
    //   }
    // })
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userID = user.uid
        this.itemsRef = this.afDB.list('/'+this.userID+'/expense');
        this.items = this.itemsRef.valueChanges();
      } 
    });
  }
  

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
        currency: this.currency,
        type: this.type,
        note: this.note
      }, {responseType: 'text'}).subscribe(
        (val) => {
          console.log("Insert Successful")
          
        },
        response => {
          console.log("POST call in error", response);
        })
  }
}
