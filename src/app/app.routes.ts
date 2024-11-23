import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HistoryComponent } from './components/history/history.component';

export const routes: Routes = [
    {
      path: "",
      component: MainComponent
    },
    {
      path: "history",
      component: HistoryComponent
    },
    {
      path: "**",
      redirectTo: "/"  // Wildcard route for a 404 page
    }
  ];
