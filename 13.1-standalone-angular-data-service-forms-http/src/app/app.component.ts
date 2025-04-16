import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photo.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent {

}
