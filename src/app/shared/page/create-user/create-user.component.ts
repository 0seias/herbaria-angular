import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Credentials } from '../../models/credentials';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

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
      this.router.navigate(['herbaria']);

    }
  }

}



