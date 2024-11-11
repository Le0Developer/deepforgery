import { hookFunction } from "../lib/hook-js";
import { log } from "../lib/log";

const originalOscillatorConnect = OscillatorNode.prototype.connect;
hookFunction(OscillatorNode.prototype, "connect", function () {
	if (this.type === "square" && this.frequency.value === 1000) {
		this.frequency.value += Math.random() * 20 - 10;
	}
	return originalOscillatorConnect.apply(this, arguments);
});

const originalDynamicsCompressorConnect =
	DynamicsCompressorNode.prototype.connect;
hookFunction(DynamicsCompressorNode.prototype, "connect", function () {
	log("audio fingerprint", "DynamicsCompressorNode.prototype.connect");
	if (
		this.threshold.value === -70 &&
		this.knee.value === 40 &&
		this.ratio.value === 12 &&
		this.attack.value === 0 &&
		this.release.value === 0.25
	) {
		this.threshold.value += Math.random() * 2 - 1;
		this.ratio.value += Math.random() * 2 - 1;
	}
	return originalDynamicsCompressorConnect.apply(this, arguments);
});

const originalFilterConnect = BiquadFilterNode.prototype.connect;
hookFunction(BiquadFilterNode.prototype, "connect", function () {
	log("audio fingerprint", "BiquadFilterNode.prototype.connect");
	if (
		this.type === "allpass" &&
		this.frequency.value === 5.239622852977861 &&
		this.Q.value === 0.1
	) {
		this.frequency.value += Math.random() * 0.001 - 0.0005;
		this.Q.value += Math.random() * 0.5 - 0.25;
	}
	return originalFilterConnect.apply(this, arguments);
});
