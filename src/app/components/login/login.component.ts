import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    IdCcms: new FormControl('', Validators.required),
    Contrasena: new FormControl('', Validators.required),
  });

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
  constructor(private api: ApiService, private toastr: ToastrService, private router:Router) {}

  ngOnInit(): void {}

  Login(value: any) {
    const params = {
      IdCcms: value.IdCcms,
      Contrasena: value.Contrasena,
    };
    this.api.request(params, 'auth').subscribe(
      (res: any) => {
        if(res.body.token){
          localStorage.setItem('token', res.body.token)
          this.router.navigate(['contest'])
        }
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
