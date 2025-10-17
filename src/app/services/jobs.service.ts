import { Injectable, inject } from '@angular/core';
import { Database, ref, get, set } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class JobsService {
    private db = inject(Database);

    // Returns a Promise<DataSnapshot>
    getJobs() {
        const jobsRef = ref(this.db, 'jobs');
        return get(jobsRef);
    }

    // Add a new job
    async addJob(job: { title: string; company: string; location: string }) {
        const jobRef = ref(this.db, `jobs/${Date.now()}`); // create new path with timestamp
        await set(jobRef, job); // ✅ use the modular set() function
    }
}
