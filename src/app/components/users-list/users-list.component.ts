import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers:[UsersService]
})
export class UsersListComponent implements OnInit {
 users:User[]=[];
 keys:string[]=['name','email','number'];
 deletedId:number;
 @ViewChild('closeDeletedModal') CloseBtnDeletedModal:ElementRef;
 @ViewChild('closeModal') CloseModal:ElementRef;


 //update User
 updateUserGroup:FormGroup=new FormGroup({
   id:new FormControl(),
  name: new FormControl('' ,Validators.required ),
  email: new FormControl('' ,[Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')]),
  number: new FormControl('' ,[Validators.required, Validators.pattern('^[+]?(\\-|1\\s|1|\\d{3}\-|\\d{3}\\s|)?((\\(\\d{3}\\))|\\d{3})(\\-|\\s)?(\\d{3})(\\-|\\s)?(\\d{4})$')] ),

})


 //end of update User
  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data=>this.users=data)
  }
   getValue(user:User , key:string) {
    return (user as any)[key];
}
showDeletedModal(id:number,event:Event){
  event.stopPropagation();
  this.deletedId=id;
}
deleteHandler(){
this.users=this.users.filter(data=>data.id!==this.deletedId)
this.CloseBtnDeletedModal.nativeElement.click();
}
updateHandler(event:Event, user:User){
  event.stopPropagation();
  this.updateUserGroup.setValue({
     id:user.id,
    name:user.name,
    email:user.email,
    number:user.phone
  })
}
updateUser(){
  console.log(this.updateUserGroup.value)
    const elementIndex=this.users.findIndex(element=>element.id===this.updateUserGroup.controls['id'].value)
 const  {name , number , email}=this.updateUserGroup.value;
    this.users[elementIndex].name=name;
    this.users[elementIndex].phone=number;
    this.users[elementIndex].email=email;
    this.CloseModal.nativeElement.click();
}
userAdded(user:User)
{
  this.users.push(user);
}
}
