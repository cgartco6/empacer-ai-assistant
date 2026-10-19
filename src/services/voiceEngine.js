export class VoiceEngine {
  constructor(onTranscript, onError) {
    this.onTranscript = onTranscript;
    this.onError = onError;
    this.recognition = null;
    this.isListening = false;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (this.onTranscript) this.onTranscript(transcript);
      };

      this.recognition.onerror = (event) => {
        if (this.onError) this.onError(event.error);
      };
    }
  }

  start() {
    if (!this.recognition) {
      if (this.onError) this.onError('Speech recognition not supported in this browser.');
      return false;
    }
    this.isListening = true;
    this.recognition.start();
    return true;
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      this.recognition.stop();
    }
  }
}
