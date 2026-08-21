import { Directive, HostBinding, Input } from '@angular/core';

@Directive({

  selector: '[appHighlightMood]',
  standalone: true

})
export class HighlightMoodDirective {

  @Input('appHighlightMood') mood = '';

  @HostBinding('style.backgroundColor') get backgroundColor(): string {
    return this.mood === 'sad' || this.mood === 'angry' ? '#fbe4e4' : '#ffffff';
  
  }

}
