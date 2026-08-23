import { GEMINI_API_KEY, GEMINI_MODEL } from './config';

// Builds a small self-contained HTML page for the AI popup window.
// It's plain HTML/JS (not Angular) because it runs inside a separate
// browser window opened with window.open(), so it talks to the Gemini
// API directly with fetch.
export function buildAiPopupHtml(): string {
  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>AI</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f2fbf3;
      color: #1f3d20;
    }
    .wrap {
      box-sizing: border-box;
      height: 100vh;
      padding: 14px;
      display: flex;
      flex-direction: column;
    }
    h2 {
      margin: 0 0 10px 0;
      color: #2e7d32;
      font-size: 1.1em;
    }
    .search-row {
      display: flex;
      gap: 6px;
      margin-bottom: 10px;
    }
    input {
      flex: 1;
      min-width: 0;
      padding: 8px;
      border: 2px solid #a5d6a7;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.95em;
    }
    button {
      padding: 8px 14px;
      background-color: #549758;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    button:active {
      background-color: #2e7d32;
    }
    button:disabled {
      background-color: #a5d6a7;
      cursor: default;
    }
    .result {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      border: 1px solid #c8e6c9;
      border-radius: 8px;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      font-size: 0.9em;
    }
    .result.error {
      border-color: #c0392b;
      color: #c0392b;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <h2>AI</h2>
    <div class="search-row">
      <input id="q" type="text" placeholder="search" />
      <button id="go">بحث</button>
    </div>
    <div id="result" class="result"></div>
  </div>

  <script>
    const input = document.getElementById('q');
    const btn = document.getElementById('go');
    const resultBox = document.getElementById('result');

    async function ask() {
      const question = input.value.trim();
      if (!question) {
        return;
      }

      btn.disabled = true;
      resultBox.classList.remove('error');
      resultBox.textContent = 'wait';

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);

      try {
        const response = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent',
          {
            method: 'POST',
            signal: controller.signal,
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': '${GEMINI_API_KEY}'
            },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: question }] }]
            })
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data && data.error && data.error.message ? data.error.message : 'request failed');
        }

        const text = data.candidates && data.candidates[0] && data.candidates[0].content
          ? data.candidates[0].content.parts[0].text
          : '';
        resultBox.textContent = text || '';
      } catch (err) {
        console.error('AI popup request failed:', err);
        resultBox.classList.add('error');
        resultBox.textContent = 'error';
      } finally {
        clearTimeout(timeout);
        btn.disabled = false;
      }
    }

    btn.addEventListener('click', ask);
    input.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        ask();
      }
    });
    input.focus();
  </script>
</body>
</html>
`;
}
