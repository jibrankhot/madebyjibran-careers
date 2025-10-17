import { Injectable, inject } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase, ref, set, get, child, update, remove } from '@angular/fire/database';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private db = inject(getDatabase);

    constructor() {
        // Initialize Firebase
        provideFirebaseApp(() => initializeApp(environment.firebase));
        provideDatabase(() => getDatabase());
    }

    writeData(path: string, data: any) {
        return set(ref(this.db(), path), data);
    }

    readData(path: string) {
        const dbRef = ref(this.db());
        return get(child(dbRef, path));
    }

    updateData(path: string, data: any) {
        return update(ref(this.db(), path), data);
    }

    deleteData(path: string) {
        return remove(ref(this.db(), path));
    }
}
