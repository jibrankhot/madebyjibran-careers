import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Job {
  title: string;
  company: string;
  location: string;
  portal: string;
  link: string;
}

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
  jobs: Job[] = [];

  constructor() {
    const savedFeeds = JSON.parse(localStorage.getItem('rssFeeds') || '[]');
    this.jobs = savedFeeds.map((feed: any, i: number) => ({
      title: `${feed.keywords} Developer`,
      company: `${feed.portal} Company ${i + 1}`,
      location: feed.location,
      portal: feed.portal,
      link: feed.feedUrl
    }));
  }
}
