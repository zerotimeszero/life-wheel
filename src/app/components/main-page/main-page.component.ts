import { Component } from '@angular/core';
import { LifeWheelComponent } from '../life-wheel/life-wheel.component';

@Component({
  selector: 'app-main-page',
  imports: [LifeWheelComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  standalone: true
})
export class MainPageComponent {

  readonly testConfig = [
    1, 2, 3, 4, 5, 6, 7, 10
  ]
}
