<template>
    <div class="container">
        <bannerView
            type="table"
            :resultColumns="columns"
            :resultData="tableData"
            :configForm="options"
        />
        <div>
            <p style="text-align:left">配置项</p>
            <dlr-form :formData="options" :columns="toggleColumns" labelWidth="120px"></dlr-form>
        </div>
        <div>
            <p style="text-align:left">渲染项</p>
            <dlr-table
                id="table"
                class="dlr-table"
                :table-data="tableData"
                :page="pageInfo"
                @pageChange="pageChange"
                row-key="id"
                :columns="columns"
                v-bind="options"
            >
                <template slot="slot" slot-scope="{row,$index}">
                $index = {{$index}}
                </template>
            </dlr-table>   
        </div> 
    </div>  
</template>

<script>
import data from './data.json'
import bannerView from "@/components/banner";
export default {
	name: "Dlr-Table",
    components: { bannerView },
	computed: {
		tableData() {
			let list = JSON.parse(JSON.stringify(data));
			if (this.options.isTree) {
				return list;
			} else {
				return list.reduce(function flat(arr, obj) {
					if (obj.children) {
						obj.children.reduce(flat, arr);
						delete obj.children;
					}
					arr.push(obj);
					return arr;
				}, []);
			}
		},
	},
	data() {
		return {
            toggleColumns: [
				{
					el: "checkbox",
					prop: "border",
					label: "是否显示边框",
					slots: {
						default: false,
					},
					span: 12,
				},
				{
					el: "checkbox",
					prop: "stripe",
					label: "是否显示stripe",
					slots: {
						default: false,
					},
					span: 12,
				},
				{
					el: "checkbox",
					prop: "isTree",
					label: "是否树形结构",
					slots: {
						default: false,
					},
					span: 12,
				},
				{
					el: "checkbox",
					prop: "showPage",
					label: "是否展示分页",
					slots: {
						default: false,
					},
					span: 12,
				},
				{
					el: "checkbox",
					prop: "showNum",
					label: "是否显示序号",
					slots: {
						default: false,
					},
					span: 12,
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
				}
            ],
			options: {
				border: false,
				stripe: false,
				isTree: false,
				showPage: true,
				size: "small",
				showNum: true,
			},
			pageInfo: {
				pageSize: 20,
				pageNum: 1,
				total: 0,
			},
			columns: [
				{
					prop: "value",
					label: "名称",
					align: "left",
					width: 150,
				},
				{
					label: "描述",
					prop: "label",
				},
				{
					label: "id",
					prop: "id",
				},
				{
					label: "slotScope渲染",
					prop: "slot",
					width: 130,
				},
				{
					label: "状态",
					prop: "state",
					format(obj) {
						return obj.state ? "启用" : "禁用";
					},
				},
				{
					label: "render渲染",
					prop: "render",
					render: (h, scope) => {
						return <el-button type="primary">编辑</el-button>;
					},
				},
			],
		};
	},
	methods: {
		pageChange(pageInfo) {
			this.pageInfo = pageInfo;
		},
	},
};
</script>
<style>
.container {
	border: 1px solid #eee;
	padding: 10px;
	height: 100vh;
}
.dlr-table {
    margin: 20px;
	border-top: 2px solid #eee;
    padding: 10px;
}
</style>
