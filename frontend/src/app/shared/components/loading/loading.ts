import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading',
  imports: [CommonModule, MatProgressSpinnerModule, MatProgressBarModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  @Input() message: string = 'Carregando...';
  @Input() type: 'spinner' | 'bar' | 'dots' = 'spinner';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() overlay: boolean = false;
  @Input() color: 'primary' | 'accent' | 'warm' = 'primary';

  getDiameter(): number {
    switch (this.size) {
      case 'small':
        return 30;
      case 'medium':
        return 50;
      case 'large':
        return 80;
      default:
        return 50;
    }
  }
}
