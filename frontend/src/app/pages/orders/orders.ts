import { Component } from '@angular/core';
import { Loading } from '../../shared/components/loading/loading';

@Component({
  selector: 'app-orders',
  imports: [Loading],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  loading = true;

  // Simulate data loading
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
