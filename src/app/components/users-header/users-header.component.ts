import { Component, OnInit , Output , EventEmitter, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-header',
  templateUrl: './users-header.component.html',
  styleUrls: ['./users-header.component.css']
})
export class UsersHeaderComponent implements OnInit {

@Output() userAddes=new EventEmitter<User>();

  addUserFormGroup:FormGroup=new FormGroup({
    name: new FormControl('' ,Validators.required ),
    email: new FormControl('' ,[Validators.required,Validators.pattern(`^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$`)] ),
    number: new FormControl('' ,[Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')] ),

  })
  constructor(private usersServices:UsersService, private renderer:Renderer2) { }
  @ViewChild("closeModal",{static:false}) closeModal:ElementRef;

  ngOnInit(): void {
  }
  addNewUser(){
   console.log(this.addUserFormGroup.valid) 
   const newUser:{name:string , phone:string , email:string}={
     name:this.addUserFormGroup.controls['name']?.value,
     phone:this.addUserFormGroup.controls['phone']?.value,
     email:this.addUserFormGroup.controls['email']?.value
   }
   if(this.addUserFormGroup.valid)
   {
     console.log(newUser)
  this.usersServices.addNewUser(newUser).subscribe((data)=>{
    this.userAddes.emit(data);
    this.addUserFormGroup.reset();
this.closeModal.nativeElement.click();
  })
   }
  }


}
