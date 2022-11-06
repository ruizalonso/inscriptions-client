import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  listCiudades: Array<any> = [];
  listSexos: Array<any> = [];
  listRoles: Array<any> = [];

  constructor(private api: ApiService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getAllData();
  }
  Registration = new FormGroup({
    IdCcms: new FormControl('', Validators.required),
    IdRol: new FormControl('', Validators.required),
    Nombre: new FormControl('', Validators.required),
    Cedula: new FormControl('', Validators.required),
    IdCiudad: new FormControl('', Validators.required),
    IdSexo: new FormControl('', Validators.required),
    FechaNacimiento: new FormControl('', Validators.required),
    Contrasena: new FormControl('', Validators.required),
  });
  getAllData() {
    this.api.request({ Case: 3 }, 'auth/users').subscribe(
      (data: any) => {
        this.listCiudades = data.body.CitysList;
      },
      (err) => {
        console.log(err);
      }
    );
    this.api.request({ Case: 4 }, 'auth/users').subscribe(
      (data: any) => {
        this.listRoles = data.body.RolesList;
      },
      (err) => {
        console.log(err);
      }
    );
    this.api.request({ Case: 5 }, 'auth/users').subscribe(
      (data: any) => {
        this.listSexos = data.body.GenderList;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getFormValues(value: any) {
    let params = {
      Case: 2,
      IdCcms: value.IdCcms,
      IdRol: value.IdRol,
      Nombre: value.Nombre,
      Cedula: value.Cedula,
      IdCiudad: value.IdCiudad,
      IdSexo: value.IdSexo,
      FechaNacimiento: value.FechaNacimiento,
      Contrasena: value.Contrasena,
    };
    this.sendForm(params);
  }
  sendForm(value: any) {
    this.api
      .request(value,
        'auth/users'
      )
      .subscribe(
        (res: any) => {
          if (res.body.Result != 'User already registered') {
            this.toastr.success(res.body.Result);
          } else if (res.body.Result == 'User already registered') {
            this.toastr.error(res.body.Result);
            this.Registration.disable();
          }
          this.router.navigate(['login'])
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
}
