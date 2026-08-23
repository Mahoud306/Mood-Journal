import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HighlightMoodDirective } from '../../directives/directives';
import { MoodEntry } from '../../models/models';
import { MoodEmojiPipe } from '../../pipes/pipes';
import { AiChat } from '../ai-chat/ai-chat';

@Component({

  selector: 'app-history-list',
  standalone: true,
  imports: [CommonModule, MoodEmojiPipe, HighlightMoodDirective, AiChat],
  templateUrl: './history-list.html',
  styleUrl: './history-list.css'

})
export class History {

  @Input() entries: MoodEntry[] = [];
  
  @Output() delete = new EventEmitter<number>();

  onDelete(index: number): void {
    this.delete.emit(index);
  }

}