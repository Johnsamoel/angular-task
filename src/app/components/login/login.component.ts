import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(`^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$`), Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    if (this.loginFormGroup.valid) {
      this.authService.login({ email: this.loginFormGroup.controls['email'].value, password: this.loginFormGroup.controls['password'].value }).subscribe((res:any) => {
        console.log(res)
        localStorage.setItem('user', JSON.stringify((res as any).data))
        if ((res as any).token) {
          localStorage.setItem('token', (res as any).token);

        }
        this.router.navigate(['/']);
      })
    }
  }

}
