import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class PhotoComponent implements OnInit {

  // photo passed in from app-photo tag of app.component
  @Input() photo:any;
  // photo base url
  @Input() baseUrl:any;
    // upvotedEvent bound in app-photo tag, will trigger a function in app,component
  @Output() upvotedEvent = new EventEmitter<string>();
  // counter of upvotes on this photo
  votes:number = 0;
  // flag for whether user has voted on this photo in this session
  voted:boolean=false;

  constructor() {
  }

  // bound in photo.component template to click of Upvote! button
  upvote(title:string):void{
    console.log(title);
    this.votes+=1;
    // don't let them vote this one up again
    this.voted=true;
    this.upvotedEvent.emit(title);
  }

  ngOnInit() {
    this.photo.displayurl = this.baseUrl + this.photo.imageurl;
  }

}
