import { Component } from '@angular/core';
import { buildAiPopupHtml } from '../../ai-popup';

@Component({

  selector: 'app-ai-chat',
  standalone: true,
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css'

})
export class AiChat {

  openAiPopup(): void {
    const width = 400;
    const height = 550;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const popup = window.open(
      '',
      'aiSearch',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (popup) {
      popup.document.write(buildAiPopupHtml());
      popup.document.close();
    }
  }

}
