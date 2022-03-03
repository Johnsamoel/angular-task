import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Album } from 'src/app/models/album.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
 
})
export class AlbumsListComponent implements OnInit {
albums:Album[]=[]

  constructor(private route:ActivatedRoute, private usersServive: UsersService){}

  ngOnInit(): void {
  
    this.route.params.subscribe((data)=>{
      this.usersServive.getAlbumsByUserId(data['id'] as number).subscribe((albums)=>{
            this.albums=albums;
      })
    })
  }

}
