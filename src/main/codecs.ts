import { hookFunction } from "../lib/hook-js";
import { log } from "../lib/log";

const overwriteCodecs = ["audio/aac", "audio/mp2t", "video/3gpp"];

const originalVideoCanPlayType = HTMLVideoElement.prototype.canPlayType;

hookFunction(
	HTMLVideoElement.prototype,
	"canPlayType",
	function (this: HTMLVideoElement, mimeType: string) {
		log(
			"codecs fingerprint",
			`HTMLVideoElement.prototype.canPlayType(${mimeType})`,
		);
		if (overwriteCodecs.includes(mimeType)) {
			return "probably";
		}
		return originalVideoCanPlayType.call(this, mimeType);
	},
);

const originalAudioCanPlayType = HTMLAudioElement.prototype.canPlayType;
hookFunction(
	HTMLAudioElement.prototype,
	"canPlayType",
	function (this: HTMLAudioElement, mimeType: string) {
		log(
			"codecs fingerprint",
			`HTMLAudioElement.prototype.canPlayType(${mimeType})`,
		);
		if (overwriteCodecs.includes(mimeType)) {
			return "probably";
		}
		return originalAudioCanPlayType.call(this, mimeType);
	},
);

const originalMediaSourceIsTypeSupported = MediaSource.isTypeSupported;
hookFunction(
	MediaSource,
	"isTypeSupported",
	function (this: MediaSource, mimeType: string) {
		log("codecs fingerprint", `MediaSource.isTypeSupported(${mimeType})`);
		if (overwriteCodecs.includes(mimeType)) {
			return true;
		}
		return originalMediaSourceIsTypeSupported.call(this, mimeType);
	},
);

const originalMediaRecorderIsTypeSupported = MediaRecorder.isTypeSupported;
hookFunction(MediaRecorder, "isTypeSupported", function (mimeType: string) {
	log("codecs fingerprint", `MediaRecorder.isTypeSupported(${mimeType})`);
	if (overwriteCodecs.includes(mimeType)) {
		return true;
	}
	return originalMediaRecorderIsTypeSupported(mimeType);
});
