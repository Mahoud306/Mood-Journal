import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moodEmoji',
  standalone: true

})
export class MoodEmojiPipe implements PipeTransform {
  transform(mood: string): string {
    switch (mood) {
      case 'happy':
        return '😊';
      case 'optimistic':
        return '🌟';
      case 'sad':
        return '😢';
      case 'angry':
        return '😠';
      default:
        return '';
    
      }
  
    }

  }
