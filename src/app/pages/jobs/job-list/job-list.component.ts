import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-list',
  standalone: true,
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class JobListComponent implements OnInit {
  private firebase = inject(FirebaseService);

  jobs: any[] = [];
  newJobTitle = '';
  newJobLocation = '';
  newJobCompany = '';

  ngOnInit() {
    this.loadJobs();
  }

  async loadJobs() {
    try {
      const snapshot = await this.firebase.readData('jobs');
      if (snapshot.exists()) {
        this.jobs = Object.entries(snapshot.val()).map(
          ([id, job]: [string, any]) => ({ id, ...job })
        );
      } else {
        this.jobs = [];
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  }

  async addJob() {
    if (!this.newJobTitle || !this.newJobCompany) {
      alert('Title and Company are required');
      return;
    }

    const jobId = `job-${Date.now()}`;
    const newJob = {
      title: this.newJobTitle,
      location: this.newJobLocation,
      company: this.newJobCompany
    };

    try {
      await this.firebase.writeData(`jobs/${jobId}`, newJob);
      this.newJobTitle = '';
      this.newJobLocation = '';
      this.newJobCompany = '';
      await this.loadJobs();
    } catch (error) {
      console.error('Error adding job:', error);
    }
  }

  async deleteJob(jobId: string) {
    try {
      await this.firebase.deleteData(`jobs/${jobId}`);
      await this.loadJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  }
}
