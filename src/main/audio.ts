import { hookFunction } from "../lib/hook-js";
import { log } from "../lib/log";

const originalOscillatorConnect = OscillatorNode.prototype.connect;
hookFunction(OscillatorNode.prototype, "connect", function () {
	this.frequency.value += Math.random() * 20 - 10;
	return originalOscillatorConnect.apply(this, arguments);
});

const ranges = {
	gain: [0, 1],
	threshold: [-100, 0],
	knee: [0, 40],
	ratio: [1, 20],
	attack: [0, 1],
	release: [0, 1],
};

const originalDynamicsCompressorConnect =
	DynamicsCompressorNode.prototype.connect;
hookFunction(DynamicsCompressorNode.prototype, "connect", function () {
	log("audio fingerprint", "DynamicsCompressorNode.prototype.connect");
	for (const name of ["threshold", "knee", "ratio", "attack", "release"]) {
		let newValue = this[name].value + Math.random() * 2 - 1;
		newValue = Math.max(ranges[name][0], Math.min(ranges[name][1], newValue));
		this[name].value = newValue;
	}
	return originalDynamicsCompressorConnect.apply(this, arguments);
});

const originalFilterConnect = BiquadFilterNode.prototype.connect;
hookFunction(BiquadFilterNode.prototype, "connect", function () {
	log("audio fingerprint", "BiquadFilterNode.prototype.connect");
	this.frequency.value += Math.random() * 0.001 - 0.0005;
	this.Q.value += Math.random() * 0.5 - 0.25;
	return originalFilterConnect.apply(this, arguments);
});
