<template>
	<div id="form" class="container">
		<bannerView
			:resultColumns="columns"
			:resultData="formData"
			:configForm="options"
		/>
		<div>
			<p style="text-align:left">配置项</p>
			<dlr-form :formData="options" :columns="toggleColumns" labelWidth="120px"></dlr-form>
		</div>
		<div class="render">
			<p style="text-align:left">渲染项</p>
			<dlr-form
				:formData="formData"
				ref="dlr-form"
				class="dlr-form"
				no-warp
				:disabled="options.disabled"
				:size="options.size"
				:labelWidth="options.labelWidth + 'px'"
				:labelPosition="options.labelPosition"
				:isPreview="options.isPreview"
				:isReview="options.isReview"
				:columns="columns"
			>
			</dlr-form>
		</div>
	</div>
</template>

<script>
import bannerView from "@/components/banner";
export default {
	name: "Form",
	components: {
		bannerView,
	},
	data() {
		return {
			// 配置表单
			toggleColumns: [
				{
					el: "checkbox",
					prop: "isPreview",
					label: "是否审批",
					slots: {
						default: false,
					},
					span: 12,
				},
				{
					el: "checkbox",
					prop: "isReview",
					label: "是否只读",
					slots: {
						default: false,
					},
					span: 12,
				},
				{
					label: "禁用全部字段",
					prop: "disabled",
					el: "switch",
				},
				{
					el: "radio-group",
					prop: "size",
					label: "size",
					dataList: [
						{ label: "mini", value: "mini" },
						{ label: "small", value: "small" },
						{ label: "medium", value: "medium" },
					],
					span: 12,
				},
				{
					el: "radio-group",
					prop: "labelPosition",
					label: "标签位置",
					dataList: [
						{ label: "left", value: "left" },
						{ label: "right", value: "right" },
						{ label: "top", value: "top" },
					],
					span: 12,
				},
				{
					el: "input",
					type: "number",
					min: "80",
					prop: "labelWidth",
					label: "标签宽度",
					span: 12,
				},
			],

			// 结果表单
			options: {
				size: "small",
				labelWidth: "120",
				isPreview: false,
				isReview: false,
				labelPosition: "left",
				disabled: false,
			},
			// 结果数据
			formData: {
				name: "123",
				name_history: "123321",
				select: "cccc",
				checkbox: "true",
				checkboxGroup: [],
				time: "12:00:00",
				date: "2021-12-09",
				dateRange: ["2021-12-09", "2021-12-31"],
				switch: false,
				slider: 0,
				radio: true,
			},
			//结果列
			columns: [
				{
					el: "input",
					prop: "name",
					label: "姓名",
					placeholder: "请输入姓名",
					format: (item, row) => {
						return item + row.select;
					},
					historyFormat: (item) => {
						return item + "!!!";
					},
					span: 24,
					rules: {
						required: true,
						message: "请输入姓名",
						trigger: "blur",
					},
				},
				{
					el: "select",
					prop: "select",
					label: "选择",
					placeholder: "请选择",
					span: 24,
					dataList: [
						{ label: "123", value: "123" },
						{ label: "234", value: "234" },
						{ label: "345", value: "345" },
						{ label: "456", value: "456" },
					],
					format: (item, row) => {
						return item + row.name;
					},
					slots: {
						default: this.customRender,
					},
					rules: {
						required: true,
						message: "请选择",
						trigger: "change",
					},
				},
				{
					el: "checkbox",
					prop: "checkbox",
					label: "Checkbox",
					slots: {
						default: "是",
					},
					span: 24,
				},
				{
					label: "复选框",
					el: "checkbox-group",
					prop: "checkboxGroup",
					dataList: [
						{ label: "a", value: "a" },
						{ label: "b", value: "b" },
					],
				},
				{
					el: "radio",
					prop: "radio",
					label: "Radio",
					slots: {
						default: "true",
					},
					span: 24,
				},
				{
					el: "time-picker",
					prop: "time",
					label: "时间选择器",
					span: 24,
					valueFormat: "HH:mm:ss",
				},
				{
					el: "date-picker",
					prop: "date",
					label: "日期选择器",
					span: 24,
					valueFormat: "yyyy-MM-dd",
				},
				{
					el: "date-picker",
					prop: "dateRange",
					label: "日期区间选择器",
					span: 24,
					valueFormat: "yyyy-MM-dd",
					type: "daterange",
				},
				{
					el: "switch",
					prop: "switch",
					label: "Switch",
					span: 24,
				},
				{
					el: "slider",
					prop: "slider",
					label: "Slider",
					showInput: true,
					span: 24,
				},
			],
		};
	},
	methods: {
		customRender(h, item) {
			return (
				<div>
					<span style="float: left">{item.label}</span>
					<span style="float: right; color: #8492a6; font-size: 13px">
						{item.value}
					</span>
				</div>
			);
		},
	},
};
</script>
<style>
.container {
	border: 1px solid #eee;
	padding: 10px;
}
.render {
	border-top: 2px solid #eee;
	padding-top: 20px;
}
</style>
