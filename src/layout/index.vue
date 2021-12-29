<template>
	<div class="app-wrapper">
		<sidebar class="sidebar"></sidebar>
		<div class="main-container">
			<app-main></app-main>
		</div>
	</div>
</template>
<script>
import Sidebar from "./sidebar";
import AppMain from "./App.vue";
export default {
	components: {
		Sidebar,
		AppMain,
	},
};
</script>
<style scoped lang="scss">
.app-wrapper {
	height: 100vh;
	position: absolute;
	width: 100%;
	display: flex;
	/deep/ .el-scrollbar__wrap {
		overflow-x: hidden;
	}
	.sidebar {
		overflow-y: scroll;
		height: 100%;
		flex-basis: 6%;
		/deep/ .el-menu--collapse {
			background-color: var(--light);
			height: 100%;
            width: 100%;
		}
	}
	.main-container {
		background-color: #fefefe;
		flex: 1;
	}
}
</style>
