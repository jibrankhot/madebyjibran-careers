import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsService } from './services/jobs.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  jobs: any[] = [];

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
    this.jobsService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
      console.log('Loaded jobs:', this.jobs);
    });
  }
}

