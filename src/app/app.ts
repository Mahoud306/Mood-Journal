import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Options } from './components/options-form/options-form';
import { History } from './components/history-list/history-list';
import { MoodEntry } from './models/models';
import { EntryService } from './services/services';

@Component({

  selector: 'app-root',
  imports: [RouterOutlet, Options, History],
  templateUrl: './app.html',
  styleUrl: './app.css'

})
export class App {

  constructor(public entryService: EntryService) {}

  onAddEntry(entry: MoodEntry): void {

    this.entryService.addEntry(entry);
  }

  onDeleteEntry(index: number): void {
    
    this.entryService.deleteEntry(index);
  }

}