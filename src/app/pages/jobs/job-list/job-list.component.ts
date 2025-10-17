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

  loadJobs() {
    this.firebase.readData('jobs')
      .then(snapshot => {
        if (snapshot.exists()) {
          this.jobs = Object.entries(snapshot.val()).map(([id, job]: [string, any]) => ({ id, ...job }));
        } else {
          this.jobs = [];
        }
      })
      .catch(err => console.error(err));
  }

  addJob() {
    if (!this.newJobTitle || !this.newJobCompany) return alert('Title and Company are required');

    const jobId = `job-${Date.now()}`;
    const newJob = {
      title: this.newJobTitle,
      location: this.newJobLocation,
      company: this.newJobCompany
    };

    this.firebase.writeData(`jobs/${jobId}`, newJob).then(() => {
      this.newJobTitle = '';
      this.newJobLocation = '';
      this.newJobCompany = '';
      this.loadJobs();
    });
  }

  deleteJob(jobId: string) {
    this.firebase.deleteData(`jobs/${jobId}`).then(() => this.loadJobs());
  }
}
