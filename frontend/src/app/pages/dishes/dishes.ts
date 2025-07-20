import { Component } from '@angular/core';
import { Loading } from '../../shared/components/loading/loading';

@Component({
  selector: 'app-dishes',
  imports: [Loading],
  templateUrl: './dishes.html',
  styleUrl: './dishes.scss',
})
export class Dishes {
  loading = true;

  // Simulate data loading
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
