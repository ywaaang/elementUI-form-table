<template>
	<div class="button-container">
		<el-header>
			<el-button
				v-for="(item, index) in buttons"
				:key="index"
				:type="item.type"
				:size="item.size"
				:icon="item.icon"
				@click="item.method"
				>{{ item.label }}</el-button
			>
		</el-header>
		<!-- 生成代码 -->
		<public-dialog
			title="生成代码"
			:show.sync="showCode"
			width="70%"
			@close="showCode = false"
		>
			<template slot="body">
				<ace-editor
					id="codeAceEditor"
					ref="codeAceEditor"
					:data="codeConfig"
					:height="330"
				/>
			</template>
			<template slot="action">
				<el-button
					size="small"
					type="primary"
					class="copyCode"
					@click="handleCopyCode"
					>复制</el-button
				>
			</template>
		</public-dialog>
		<!-- 生成表单配置 -->
		<public-dialog
			title="生成表单配置"
			:show.sync="showForm"
			width="70%"
			@close="showForm = false"
		>
			<template slot="body">
				<ace-editor
					id="formAceEditor"
					ref="formAceEditor"
					:data="formConfig"
					:height="330"
				/>
			</template>
			<template slot="action">
				<el-button
					size="small"
					type="primary"
					class="copyForm"
					@click="handleCopyCode"
					>复制</el-button
				>
			</template>
		</public-dialog>
		<!-- 生成数据配置 -->
		<public-dialog
			title="生成数据配置"
			:show.sync="showData"
			width="70%"
			@close="showData = false"
		>
			<template slot="body">
				<ace-editor
					id="dataAceEditor"
					ref="dataAceEditor"
					:data="dataConfig"
					:height="330"
				/>
			</template>
			<template slot="action">
				<el-button
					size="small"
					type="primary"
					class="copyData"
					@click="handleCopyCode"
					>复制</el-button
				>
			</template>
		</public-dialog>
	</div>
</template>
<script>
import PublicDialog from "@/components/PublicDialog";
import AceEditor from "@/components/AceEditor";
import { formatJson, copyText } from "@/utils";
import vueComponent from "@/utils/vue-component";
export default {
	name: "BannerView",
	components: {
		PublicDialog,
		AceEditor,
	},
	props: {
		resultColumns: {
			required: true,
		},
		resultData: {
			required: true,
		},
		configForm: {
			required: true,
		},
		type: {
			default: 'form'
		}
	},
	data() {
		return {
			codeConfig: "",
			dataConfig: "",
			formConfig: "",
			showCode: false,
			showForm: false,
			showData: false,
			buttons: [
				{
					type: "text",
					size: "medium",
					icon: "el-icon-upload2",
					label: "查看配置项",
					method: () => this.handleOpenCopy("config"),
				},
				{
					type: "text",
					size: "medium",
					icon: "el-icon-upload2",
					label: "查看数据项",
					method: () => this.handleOpenCopy("data"),
				},
				{
					type: "text",
					size: "medium",
					icon: "el-icon-upload2",
					label: "查看代码",
					method: () => this.handleOpenCopy("code"),
				},
			],
		};
	},
	methods: {
		handleCopyText(ref, className) {
			copyText(this.$refs[ref].getValue(), className)
				.then((res) => {
					this.$message({
						message: "复制成功",
						type: "success",
						center: true,
					});
				})
				.catch((err) => {
					this.$message({
						message: "复制失败",
						type: "error",
						center: true,
					});
				});
		},
		handleCopyCode(type) {
			switch (type) {
				case "code":
					this.handleCopyText("codeAceEditor", ".copyCode");
					break;
				case "data":
					this.handleCopyText("dataAceEditor", ".copyData");
					break;
				default:
					this.handleCopyText("formAceEditor", ".copyForm");
					break;
			}
		},
		handleOpenCopy(type) {
			switch (type) {
				case "code":
					this.codeConfig = vueComponent({
						form: this.resultData,
						column: this.resultColumns,
						config: this.configForm,
						type: this.type
					});
					this.showCode = true;
					break;
				case "data":
					this.dataConfig = this.resultData;
					this.showData = true;
					break;
				default:
					this.formConfig = this.resultColumns;
					this.showForm = true;
					break;
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.button-container {
    margin-bottom: 20px;
}
.el-header {
	height: 45px !important;
	line-height: 45px;
	font-size: 18px;
	border-bottom: 2px solid #e4e7ed;
	text-align: right;
}
</style>
