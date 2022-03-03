import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';
import { Photo } from '../models/photo.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users:User[]=[];
 baseURL:string='https://jsonplaceholder.typicode.com/';
  constructor(private http:HttpClient) {
   }
  getAllUsers()
  {
     return  this.http.get<User[]>(this.baseURL+'users');
  }
  getUserById(id:number){
  return  this.http.get<User>(this.baseURL+'users/'+id);
  }
  getAlbumsByUserId(id:number)
  {
    return  this.http.get<Album[]>(this.baseURL+'users/'+id+'/albums');

  }
  addNewUser(newUser:{name:string , phone:string , email:string })
  {
 const user={
  name: newUser.name,
  email:newUser.email,
  username: 'mostafa77928',
  address: {
    street: 'eldwahei',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: newUser.phone,
  website: 'mostafa.org',
  company: {
    name: 'Google',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
}

 return this.http.post<User>(this.baseURL+'users',user);
  }

  getAlbumPhotos(id:number){
    return this.http.get<Photo[]>(this.baseURL+'albums/'+id+"/photos");
  }


}
