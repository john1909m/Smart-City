import { platformBrowser } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AppModule } from './app/app-module';

platformBrowser().bootstrapModule(AppModule, {
  providers: [provideCharts(withDefaultRegisterables())],
})
  .catch((err) => console.error(err));
