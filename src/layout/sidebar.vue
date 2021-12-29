<template>
	<div>
		<el-menu
			:default-active="active"
			class="el-menu-vertical"
			@open="handleOpen"
			@close="handleClose"
			:collapse="true"
		>
			<el-menu-item index="0"
				><img
					alt="Vue logo"
					src="../assets/logo.png"
					style="width: 100%; text-align:center"
			/></el-menu-item>
			<router-link to="/">
				<el-menu-item index="1">
					<i class="el-icon-files"></i>
					<span slot="title">表单</span>
				</el-menu-item>
			</router-link>
			<router-link to="/table">
				<el-menu-item index="2">
					<i class="el-icon-s-data"></i>
					<span slot="title">表格</span>
				</el-menu-item>
			</router-link>
		</el-menu>
	</div>
</template>
<script>
export default {
	data() {
		return {
			active: "1",
		};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
	},
};
</script>
<style lang="scss">
.el-menu {
	height: 100%;
}
</style>
