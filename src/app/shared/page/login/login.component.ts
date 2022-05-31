import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Credentials } from '../../models/credentials';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar,
    private router: Router) { 
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  submit() {
    if (!this.form?.invalid) {
      const creds = new Credentials();
      creds.email = this.form?.get("email")?.value;
      creds.password = this.form?.get("password")?.value;
      this.service.login(creds).subscribe(res=>{
        this.localStorageService.set('token', res);
        this.router.navigate(['herbaria']);
      },error=>{
        this.snackBar.open(error.error.text, 'ok');
      });  
    }
  }

}

