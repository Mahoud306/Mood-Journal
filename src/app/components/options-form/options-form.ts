import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoodEntry } from '../../models/models';

@Component({

  selector: 'app-options-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './options-form.html',
  styleUrl: './options-form.css'

})
export class Options {

  @Output() addoption = new EventEmitter<MoodEntry>();

  private fb = inject(FormBuilder);

  moods = [
    { value: 'happy', label: '😊 happy' },
    { value: 'optimistic', label: '🌟 optimistic' },
    { value: 'sad', label: '😢 sad' },
    { value: 'angry', label: '😠 angry' }
  ];

  options = this.fb.group({
    date: ['', Validators.required],
    mood: ['', Validators.required],
    note: ['', Validators.maxLength(300)]
  
  });

  selectMood(mood: string): void {
    this.options.get('mood')?.setValue(mood);
    this.options.get('mood')?.markAsTouched();
  
  }

  submit(): void {
    if (this.options.invalid) {
      this.options.markAllAsTouched();
      return;
    
    }

    const newEntry: MoodEntry = {
      date: this.options.value.date ?? '',
      mood: this.options.value.mood ?? '',
      note: this.options.value.note ?? ''
    
    };

    this.addoption.emit(newEntry);

    this.options.reset();
  
  }

}