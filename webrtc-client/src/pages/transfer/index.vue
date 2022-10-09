<template>
	<div class="transfer-box">
		<div class="transfer">
			<video src="" ref="v1" controls autoplay></video>
			<video src="" ref="v2" controls autoplay></video>
		</div>
		<button @click="start">开始</button>
		<button @click="transfer">传输</button>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const v1 = ref<HTMLVideoElement | null>(null);
const v2 = ref<HTMLVideoElement | null>(null);

const start = () => {
	navigator.mediaDevices
		.getUserMedia({
			audio: true,
			video: true,
		})
		.then((stream) => {
			if (v1.value) v1.value.srcObject = stream;
		});
};
const transfer = () => {
	if (v2.value && v1.value) {
		v2.value.srcObject = v1.value.captureStream();
	}
};
</script>

<style lang="less">
.transfer {
	display: flex;
	justify-content: center;
	video {
		width: 480px;
		height: 320px;
		margin-left: 20px;
	}
}
.transfer-box {
	button {
		margin: 10px;
	}
}
</style>
