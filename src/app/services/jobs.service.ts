import { Injectable, inject } from '@angular/core';
import { Database, ref, get, child, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobsService {
    private db = inject(Database);

    getJobs(): Observable<any[]> {
        return new Observable(observer => {
            const jobsRef = ref(this.db, 'jobs');
            onValue(jobsRef, snapshot => {
                const data = snapshot.val();
                observer.next(data ? Object.values(data) : []);
            });
        });
    }
}
