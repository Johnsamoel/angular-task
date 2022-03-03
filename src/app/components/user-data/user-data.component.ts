import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  isLoaded:boolean=false;
  user:User;
  constructor(private route:ActivatedRoute, private usersServive: UsersService) { }

  ngOnInit(): void {
    this.route.params.subscribe((data)=>{
      this.usersServive.getUserById(data['id'] as number).subscribe((user)=>{
            this.user=user;
            this.isLoaded=true;
            console.log(user);
      })
    })
  }

}
