<template>
	<div class="container">
		<div class="control">
			<el-tabs v-model="activeName">
				<el-tab-pane label="组件配置" name="item">
					<dlr-select
						@change="elConfig.onChange(elSelected)"
						:data-list="elConfig.dataList"
						v-model="elSelected"
						class="el"
					/>
					<dlr-form
						:formData="forms"
						ref="configItem"
						no-warp
						:columns="columns"
						labelWidth="60px"
					/>
					<el-button size="mini" @click="resultColumns = []"
						>清空</el-button
					>
					<el-button size="mini" type="danger" @click="handleDelete"
						>删除</el-button
					>
					<el-button @click="handleChange" type="primary"
						>确认</el-button
					>
				</el-tab-pane>
				<el-tab-pane label="表单配置" name="form">
					<dlr-form
						:formData="configForm"
						ref="configForm"
						no-warp
						:columns="configColumns"
						labelWidth="60px"
					/>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="render">
			<bannerView
				:resultColumns="resultColumns"
				:resultData="resultData"
				:configForm="configForm"
			/>
			<dlr-form
				class="dlrForm"
				ref="dlrForm"
				:formData="resultData"
				no-warp
				:columns="resultColumns"
			/>
			<div class="data">
				配置项：
				<pre v-html="jsonResultColumns"></pre>
				数据项：
				<pre v-html="jsonResultData"></pre>
			</div>
		</div>
		<el-dialog
			title="确认删除"
			:visible.sync="showDeleteDialog"
			width="30%"
		>
			<dlr-select
				:data-list="deletionList"
				v-model="deleteItem"
			></dlr-select>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showDeleteDialog = false">取 消</el-button>
				<el-button type="primary" @click="handleDeleteConfirm"
					>确 定</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import {
	RULES,
	FORMS,
	COMMON_FORMS,
	COMMON_COLUMNS,
	COLUMNS,
	FORM_SETTING,
	FORM_COLUMNS,
} from "@/assets/constant";
import { formatJson } from "@/utils";
import vueComponent from "@/utils/vue-component";
import bannerView from "@/components/banner";
export default {
	components: {
		bannerView,
	},
	computed: {
		jsonResultColumns() {
			return formatJson(this.resultColumns);
		},
		jsonResultData() {
			return formatJson(this.resultData);
		},
	},
	data() {
		return {
			activeName: "item",
			deleteItem: "",
			deletionList: [],
			showDeleteDialog: false,
			forms: {},
			resultColumns: [],
			resultData: {},
			elSelected: "",
			elConfig: {
				onChange: (item) => {
					this.columns = [
						...COMMON_COLUMNS,
						...(COLUMNS[item] || []),
					];
					this.forms = {
						...COMMON_FORMS,
						...FORMS[item],
						el: item,
					};
					console.log(this.columns)
				},
				dataList: [
					{ label: "输入框", value: "input" },
					{ label: "选择框", value: "select" },
					{ label: "时间选择器", value: "time-picker" },
					{ label: "日期选择器", value: "date-picker" },
					{ label: "时间日期选择器", value: "date-time-picker" },
					{ label: "多选框", value: "checkbox" },
					{ label: "开关", value: "switch" },
					{ label: "文件上传", value: "upload" },
					{ label: "评分", value: "rate" },
					{ label: "滑块", value: "slider" },
					{ label: "级联选择器", value: "cascader" },
				],
			},
			columns: [],
			configForm: { ...FORM_SETTING },
			configColumns: [...FORM_COLUMNS],
		};
	},
	methods: {
		handleChange() {
			const forms = { ...this.forms };
			if (this.resultData[forms.prop]) {
				this.$message.error(
					"Duplicate keys detected: " + this.forms.prop
				);
				return;
			}
			forms.rules = forms.rules.map((item) => RULES[item]);
			this.resultColumns.push({ ...forms });
			this.resultData = {
				...this.resultData,
				[this.forms.prop]: forms.value,
			};
			this.forms = {}
		},
		handleDelete() {
			this.deletionList = this.resultColumns.map((item) => ({
				label: item.label + " - " + item.prop,
				value: item.prop,
			}));
			this.showDeleteDialog = true;
		},
		handleDeleteConfirm() {
			this.resultColumns = this.resultColumns.filter(
				(item) => item.prop !== this.deleteItem
			);
			this.deleteItem = "";
			this.showDeleteDialog = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.container {
	height: 100vh;
	width: 100%;
	display: flex;
	.control {
		flex-basis: 30%;
		padding: 0 20px;
		box-sizing: border-box;
		padding-right: 10px;
		border-right: 1px solid #eaecef;
		overflow-y: auto;
		.el {
			margin-bottom: 20px;
		}
	}
	.render {
		flex: 1;
		padding: 0 20px;
		.form {
			height: 60%;
		}
		.data {
			height: 40%;
			pre {
				outline: 1px solid #ccc;
				padding: 5px;
				margin: 5px;
				text-align: left;
				/deep/ .string {
					color: green;
				}
				/deep/ .number {
					color: darkorange;
				}
				/deep/ .boolean {
					color: blue;
				}
				/deep/ .null {
					color: magenta;
				}
				/deep/ .key {
					color: red;
				}
			}
		}
	}
}
</style>
