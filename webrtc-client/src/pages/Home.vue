<template>
	<div class="home">
		<div>
			<router-link :to="{ name: 'speech' }">H5 语音识别</router-link>
		</div>
		<div>
			<router-link :to="{ name: 'transfer' }"
				>video 标签之间的流传输</router-link
			>
		</div>
		<div>
			<router-link :to="{ name: 'local' }"
				>WebRTC 1 v 1 本地对等连接</router-link
			>
		</div>
		<div>
			<router-link :to="{ name: 'remote1' }"
				>WebRTC 1 v 1 网络对等连接</router-link
			>
		</div>
		<div>
			<router-link :to="{ name: 'many' }">多人聊天</router-link>
		</div>
		<div>
			<router-link :to="{ name: 'whiteboard' }">白板演示</router-link>
		</div>
		<div>
			<router-link :to="{ name: 'palette' }">共享画板</router-link>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: 'Home',
	data() {
		return {};
	},
	methods: {},
};
</script>
<style lang="less" scoped>
.home {
	text-align: center;
	margin: auto;
	font-size: 18px;
	border: 1px solid #ddd;
	margin-top: 50px;
	position: relative;

	a {
		color: #323232;
	}

	div {
		line-height: 48px;
		border-bottom: 1px solid #ddd;
		cursor: pointer;
	}

	div:last-child {
		border-bottom: none;
	}

	div:hover {
		background-color: #25b25e;

		a {
			display: block;
			color: #fff;
		}
	}
}
</style>
