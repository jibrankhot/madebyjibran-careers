import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FeedConfig {
  portal: string;
  keywords: string;
  location: string;
  feedUrl: string;
}

@Component({
  selector: 'app-rss-feed-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rss-feed-manager.component.html',
  styleUrls: ['./rss-feed-manager.component.scss']
})
export class RssFeedManagerComponent {
  feed: FeedConfig = { portal: '', keywords: '', location: '', feedUrl: '' };
  savedFeeds: FeedConfig[] = [];

  constructor() {
    const storedFeeds = localStorage.getItem('rssFeeds');
    if (storedFeeds) this.savedFeeds = JSON.parse(storedFeeds);
  }

  generateUrl() {
    if (this.feed.portal.toLowerCase() === 'linkedin') {
      this.feed.feedUrl = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(this.feed.keywords)}&location=${encodeURIComponent(this.feed.location)}`;
    } else if (this.feed.portal.toLowerCase() === 'naukri') {
      this.feed.feedUrl = `https://www.naukri.com/${this.feed.keywords}-jobs-in-${this.feed.location}`;
    } else {
      this.feed.feedUrl = '';
    }
  }

  saveFeed() {
    if (!this.feed.feedUrl) return alert('Generate a valid feed URL first.');
    this.savedFeeds.push({ ...this.feed });
    localStorage.setItem('rssFeeds', JSON.stringify(this.savedFeeds));
    this.feed = { portal: '', keywords: '', location: '', feedUrl: '' };
  }

  deleteFeed(index: number) {
    this.savedFeeds.splice(index, 1);
    localStorage.setItem('rssFeeds', JSON.stringify(this.savedFeeds));
  }
}
