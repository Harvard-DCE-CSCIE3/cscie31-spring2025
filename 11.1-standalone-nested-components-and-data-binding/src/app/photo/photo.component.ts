import { Component, OnInit, Input, Output, EventEmitter, signal } from '@angular/core';
import { Photo } from '../models/photo.interface';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.css'],
    standalone: true
})
export class PhotoComponent implements OnInit {
    // photo passed in from app-photo tag of app.component
    @Input() photo!: Photo;
    // upvotedEvent bound in app-photo tag, will trigger a function in app.component
    @Output() upvoted = new EventEmitter<number>();
    // counter of upvotes on this photo
    votes = signal<number>(0);

    constructor() {}

    ngOnInit(): void {
        this.votes.set(this.photo.votes || 0);
    }

    // bound in photo.component template to click of Upvote! button
    upvote(): void {
        this.votes.update(v => v + 1);
        this.upvoted.emit(this.photo._id);
    }
}
