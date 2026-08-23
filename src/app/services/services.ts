import { Injectable, signal } from '@angular/core';
import { MoodEntry } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  entries = signal<MoodEntry[]>([]);

  getEntries(): MoodEntry[] {

    return this.entries();
  }

  addEntry(entry: MoodEntry): void {

    this.entries.update(list => [entry, ...list].slice(0, 10));
  }

  deleteEntry(index: number): void {

    this.entries.update(list => list.filter((_, i) => i !== index));
  }

}