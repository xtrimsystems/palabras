import { CustomEventTarget } from './CustomEventTarget';

class SpeechSynthesis extends CustomEventTarget
{
	private voices: SpeechSynthesisVoice[] = [];
	private readonly speech: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();

	public constructor() {
		super();

		window.speechSynthesis.addEventListener('voiceschanged', () => this.handleSpeechSynthesisVoices());

		this.speech.volume = 1;
	}

	public setVoice(locale: string) {
		this.speech.voice = this.voices.find((voice) => voice.lang.match(locale)) || null;
	}

	public readOutLoud (message: string, secondMessage?: string) {

		if (secondMessage) {
			this.speech.onend = () => {
				this.speech.onend = null;
				this.readOutLoud(secondMessage);
			};
		}

		this.speech.text = message;

		window.speechSynthesis.cancel();
		window.speechSynthesis.speak(this.speech);
	}

	private handleSpeechSynthesisVoices () {
		// window.speechSynthesis.removeEventListener('voiceschanged', handleSpeechSynthesisVoices);
		this.voices = window.speechSynthesis.getVoices().filter((voice) => voice.lang.match(/e[n|s]/)).sort(function (a, b) {
			const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
			if ( aname < bname ) return -1;
			else if ( aname === bname ) return 0;
			else return +1;
		});

		this.dispatchEvent(new CustomEvent('onLoad'), this.voices);
	}
}

export const speechSynthesis = new SpeechSynthesis();
