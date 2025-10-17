import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobsService } from './services/jobs.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  jobs: any[] = [];
  private jobsService = inject(JobsService);

  ngOnInit() {
    this.loadJobs();
  }

  async loadJobs() {
    try {
      const snapshot = await this.jobsService.getJobs();
      if (snapshot.exists()) {
        const jobsData = snapshot.val();
        // Convert object to array
        this.jobs = Object.keys(jobsData).map(key => jobsData[key]);
      } else {
        this.jobs = [];
      }
      console.log('Loaded jobs:', this.jobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  }
}
