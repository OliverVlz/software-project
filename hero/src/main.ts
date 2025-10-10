import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

document.documentElement.classList.toggle(
  'dark',
  localStorage['theme'] === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
