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
const userList = ref<any[]>([]);
const roomid = ref('webrtc_1v1'); // 指定房间ID
const isCall = ref(false); // 正在通话的对象
const loading = ref(false);
const loadingText = ref('呼叫中');
const isToPeer = ref(false); // 是否建立了 P2P 连接
const peer = ref(null);
const offerOption = ref({
	offerToReceiveAudio: 1,
	offerToReceiveVideo: 1,
});

const createOffer = async (data: any) => {
	console.log(data);
};
const createP2P = async (data: any) => {
	console.log(data);
};
const reply = (account: any, type: any) => {
	console.log(account, type);
};
const onAnswer = (data: any) => {
	console.log(data);
};
const onIce = async (data: any) => {
	console.log(data);
};
const onOffer = (data: any) => {
	console.log(data);
};

const join = () => {
	if (!account.value) return;
	isJoin.value = true;
	window.sessionStorage.account = account.value;
	socket.emit('join', { roomid: roomid.value, account: account.value });
};

const initSocket = () => {
	socket.on('joined', (data: any[]) => {
		userList.value = data;
	});
	// 收到回复
	socket.on('reply', async (data: any) => {
		loading.value = false;
		switch (data.type) {
			case '1': // 同意
				isCall.value = data.self;
				// 对方同意之后创建自己的 peer
				await createP2P(data);
				// 并给对方发送 offer
				createOffer(data);
				break;
			case '2': //拒绝
				ElMessage({
					message: '对方拒绝了你的请求！',
					type: 'warning',
				});
				break;
			case '3': // 正在通话中
				ElMessage({
					message: '对方正在通话中！',
					type: 'warning',
				});
				break;
			default:
				break;
		}
	});
	// 收到请求
	socket.on('apply', (data: any) => {
		if (isCall.value) {
			reply(data.self, '3');
			return;
		}
		console.log('object');
		ElMessageBox.confirm(data.self + ' 向你请求视频通话, 是否同意?', '提示', {
			confirmButtonText: '同意',
			cancelButtonText: '拒绝',
			type: 'warning',
		})
			.then(async () => {
				await createP2P(data); // 同意之后创建自己的 peer 等待对方的 offer
				isCall.value = data.self;
				reply(data.self, '1');
			})
			.catch(() => {
				reply(data.self, '2');
			});
	});
	// 接收到 answer
	socket.on('1v1answer', (data: any) => {
		onAnswer(data);
	});
	socket.on('1v1ICE', (data: any) => {
		// 接收到 ICE
		onIce(data);
	});
	socket.on('1v1offer', (data: any) => {
		// 接收到 offer
		onOffer(data);
	});
	// eslint-disable-next-line no-unused-vars
	socket.on('1v1hangup', (_: any) => {
		console.log(_);
		// 通话挂断
		ElMessage({
			message: '对方已断开连接！',
			type: 'warning',
		});
		if (peer.value) peer.value?.close();
		peer.value = null;
		isToPeer.value = false;
		isCall.value = false;
	});
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
