export {};

declare global {
	interface Window {
		test: string;
	}
	interface HTMLVideoElement {
		captureStream: () => MediaProvider;
	}
}
