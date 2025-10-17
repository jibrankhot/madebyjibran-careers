import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobListComponent } from './pages/jobs/job-list/job-list.component';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { RssFeedManagerComponent } from './rss-feed-manager/rss-feed-manager.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'feeds', component: RssFeedManagerComponent },
    { path: 'jobs', component: JobListComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**', redirectTo: 'home' }
];
