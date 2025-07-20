import { Component } from '@angular/core';
import { Loading } from '../../shared/components/loading/loading';

@Component({
  selector: 'app-clients',
  imports: [Loading],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients {
  loading = true;

  // Simulate data loading
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
