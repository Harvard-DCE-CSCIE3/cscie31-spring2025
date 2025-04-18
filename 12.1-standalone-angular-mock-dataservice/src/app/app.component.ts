import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photo.service';
import { PhotoComponent } from './photo/photo.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [PhotoService],
    standalone: true,
    imports: [NgFor, PhotoComponent]
})
export class AppComponent {
  constructor(private photoService:PhotoService){
  }

  photoList:any = null;
  coursename = 'CSCI E31';

  numPhotos:number = 3; //  this.photoList.length;

  totalVotes:number = 0;
  mostRecentVotedOn:string = '';
  handleUpvoted(e:any):void{
    console.log("app-component gets upvoted:" + e);
    this.totalVotes += 1;
    this.mostRecentVotedOn = e;
  }
  ngOnInit() {
      this.photoList = this.photoService.listPhotos();
  }

}
