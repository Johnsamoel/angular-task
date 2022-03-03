import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFromGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(`^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$`), Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  register()
  {
if(this.registerFromGroup.valid){
  localStorage.setItem('username',this.registerFromGroup.controls['email']?.value)
  localStorage.setItem('password',this.registerFromGroup.controls['password']?.value)
  this.router.navigate(["/login"])
}
  }

}
