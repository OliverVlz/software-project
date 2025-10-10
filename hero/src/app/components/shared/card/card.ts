import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon: string = '';
  @Input() iconColor: string = 'blue';
  @Input() imageUrl: string = '';
  @Input() altText: string = '';

  getIconBgClass(): string {
    const colorMap: { [key: string]: string } = {
      'blue': 'bg-blue-100 dark:bg-blue-900',
      'green': 'bg-green-100 dark:bg-green-900',
      'purple': 'bg-purple-100 dark:bg-purple-900',
      'orange': 'bg-orange-100 dark:bg-orange-900',
      'red': 'bg-red-100 dark:bg-red-900',
      'indigo': 'bg-indigo-100 dark:bg-indigo-900'
    };
    return colorMap[this.iconColor] || colorMap['blue'];
  }

  getIconColorClass(): string {
    const colorMap: { [key: string]: string } = {
      'blue': 'text-blue-600 dark:text-blue-400',
      'green': 'text-green-600 dark:text-green-400',
      'purple': 'text-purple-600 dark:text-purple-400',
      'orange': 'text-orange-600 dark:text-orange-400',
      'red': 'text-red-600 dark:text-red-400',
      'indigo': 'text-indigo-600 dark:text-indigo-400'
    };
    return colorMap[this.iconColor] || colorMap['blue'];
  }

  getIconPath(): string {
    const iconMap: { [key: string]: string } = {
      'lightning': 'M13 10V3L4 14h7v7l9-11h-7z',
      'check': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      'code': 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z',
      'heart': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      'star': 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      'shield': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    };
    return iconMap[this.icon] || iconMap['star'];
  }
}
