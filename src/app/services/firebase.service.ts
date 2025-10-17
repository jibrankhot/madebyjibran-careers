import { Injectable, inject } from '@angular/core';
import { Database, ref, set, get, child, update, remove } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private db = inject(Database);

    // Write data to a specific path
    writeData(path: string, data: any) {
        return set(ref(this.db, path), data);
    }

    // Read data from a specific path
    readData(path: string) {
        const dbRef = ref(this.db);
        return get(child(dbRef, path));
    }

    // Update data at a specific path
    updateData(path: string, data: any) {
        return update(ref(this.db, path), data);
    }

    // Delete data at a specific path
    deleteData(path: string) {
        return remove(ref(this.db, path));
    }
}
