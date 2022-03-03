import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/models/photo.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {
photos:Photo[]=[];
  constructor(private usersService:UsersService , private route:ActivatedRoute ) { }

  ngOnInit(): void {
this.route.params.subscribe((data)=>{
  // console.log(data['id'])
  console.log("before")
  this.usersService.getAlbumPhotos(2).subscribe((data)=>{
    console.log("dfdsfdhuiata")
    this.photos=data;
    console.log(data)
  })

})
  }

}
