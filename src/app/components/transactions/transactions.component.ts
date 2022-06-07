import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(public authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    if(!(this.authService.isLoggedIn)){
      this.router.navigate(['/sign-in'])
    }
  }

}
