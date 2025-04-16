import { Component, signal } from '@angular/core';
import { PhotoComponent } from './photo/photo.component';
import { Photo } from './models/photo.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [PhotoComponent]
})
export class AppComponent {
  coursename = signal<string>("CSCI E31");
  photoList = signal<Photo[]>([
    {
      _id: 1,
      title:'Champ Wheelin\' on the Beach',
      description:'this is my first photo',
      imageurl:'/img/champ-wheelin-on-the-beach.jpg'
    },
    {
      _id: 2,
      title:'Let Sleeping Dogs Lie',
      description:'this is my second photo',
      imageurl:'/img/ripley-and-tilda.jpg'
    },
    {
      _id: 3,
      title:'Beach Play',
      description:'this is my third photo',
      imageurl:'/img/dogs2.jpg'
    }
  ]);

  getNumberOfPhotos(): number {
    return this.photoList().length;
  }

  handleUpvoted(photoId: number): void {
    const updatedPhotos = this.photoList().map(photo => 
      photo._id === photoId 
        ? { ...photo, votes: (photo.votes || 0) + 1 }
        : photo
    );
    this.photoList.set(updatedPhotos);
  }
}
