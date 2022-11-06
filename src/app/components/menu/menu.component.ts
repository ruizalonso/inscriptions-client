import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router, private api: ApiService) { }

  ngOnInit(): void {
  }
  isAdmin: boolean = this.api.isAdmin();
  Logout(){
    const token = localStorage.getItem('token')
    if(token){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.router.navigate(['login'])
    }
  }
}
