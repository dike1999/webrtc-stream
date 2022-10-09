<template>
	<div class="remote">
		<div class="shade" v-if="!isJoin">
			<div class="input-container">
				<ElInput
					type="text"
					v-model="account"
					placeholder="请输入你的昵称"
					@keyup.enter="join"
					style="margin-right: 10px"
				/>
				<ElButton @click="join">确定</ElButton>
			</div>
		</div>
		<div class="userList"></div>
		<div class="video-container"></div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import socket from '../../utils/socket';

const account = ref(window.sessionStorage.getItem('account') || '');
const isJoin = ref(false);
const roomid = ref('webrtc_1v1');

const join = () => {
	if (!account.value) return;
	isJoin.value = true;
	window.sessionStorage.account = account.value;
	socket.emit('join', { roomid: roomid.value, account: account.value });
};

const initSocket = () => {
	console.log('init');
};

onMounted(() => {
	initSocket();
	if (account.value) {
		join();
	}
});
</script>

<style scoped lang="less">
.remote {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-start;
}
.shade {
	position: fixed;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	z-index: 100;
	background-color: rgba(0, 0, 0, 0.9);
	.input-container {
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translate(-50%, 50%);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
