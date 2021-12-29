
export const RULES_LIST = [
	{
		label: "必填",
		value: "required",
	},
	{
		label: "数字",
		value: "number",
	},
];

export const COMMON_COLUMNS = [
	{
		el: "input",
		prop: "prop",
		label: "属性值",
		placeholder: "请输入prop",
		span: 24,
	},
	{
		el: "input",
		prop: "label",
		label: "标签名",
		placeholder: "请输入标签名",
		span: 24,
	},
	{
		el: "input-number",
		prop: "span",
		label: "宽度",
		placeholder: "请输入宽度span值",
		span: 24,
		max: 24,
		min: 1,
	},
	{
		el: "input",
		prop: "value",
		label: "value",
		placeholder: "请输入value",
		span: 24,
	},
	{
		el: "input",
		prop: "placeholder",
		label: "占位值",
		placeholder: "请输入占位值",
		span: 24,
	},
	{
		el: "select",
		prop: "rules",
		label: "规则",
		multiple: true,
		placeholder: "请选择规则",
		span: 24,
		dataList: RULES_LIST,
	},
];

export const COLUMNS = {
	select: [
		{
			el: "select",
			prop: "multiple",
			label: "多选",
			placeholder: "是否多选",
			span: 24,
			dataList: [
				{ label: "多选", value: true },
				{ label: "单选", value: false },
			],
		},
	],
	switch: [
		{
			el: "input",
			prop: "activeText",
			label: "active-text",
			span: 24,
		},
		{
			el: "input",
			prop: "inactiveText",
			label: "inactive-text",
			span: 24,
		},
	],
	'checkbox': [
		{
			el: "input",
			prop: "slots.default",
			label: "值",
			span: 24,
			slots: {
				default: ''
			}
		},
	],
	'radio-group': [
		{
			el: "select",
			prop: "type",
			label: "type",
			span: 24,
			dataList: [
				{ label: "默认", value: null },
				{ label: "按钮", value: 'button' },
			],
		},
	],
	'checkbox-group': [
		{
			el: "select",
			prop: "type",
			label: "type",
			span: 24,
			dataList: [
				{ label: "默认", value: null },
				{ label: "按钮", value: 'button' },
			],
		},
	],
	"time-picker": [
		{
			el: "input",
			prop: "valueFormat",
			label: "value-format",
			span: 24,
		},
	],
	"date-picker": [
		{
			el: "select",
			prop: "type",
			label: "type",
			span: 24,
			dataList: [
				{
					label: "year",
					value: "year",
				},
				{
					label: "month",
					value: "month",
				},
				{
					label: "date",
					value: "date",
				},
				{
					label: "dates",
					value: "dates",
				},
				{
					label: "week",
					value: "week",
				},
				{
					label: "datetime",
					value: "datetime",
				},
				{
					label: "datetimerange",
					value: "datetimerange",
				},
				{
					label: "daterange",
					value: "daterange",
				},
				{
					label: "monthrange",
					value: "monthrange",
				},
			],
		},
		{
			el: "input",
			prop: "format",
			label: "format",
			span: 24,
		},
		{
			el: "input",
			prop: "valueFormat",
			label: "value-format",
			span: 24,
		},
	],
};

export const COMMON_FORMS = {
	prop: "",
	span: 24,
	label: "",
	value: "",
	rules: [],
	placeholder: "",
	el: "",
};

export const FORMS = {
	select: {
		multiple: false,
		dataList: [],
	},
	checkbox: {
		slots: {
			default: false
		}
	},
	switch: {
		activeText: '',
		inactiveText: ''
	},
	"time-picker": {
		'valueFormat': ''
	},
	"date-picker": {
		type: "date",
		format: '',
		'valueFormat': ''
	},
	"radio-group": {
		type: null,
		dataList: [],
	},
	"checkbox-group": {
		type: null,
		dataList: [],
	},
	cascader: {
		options: [],
	},
};

export const FORM_SETTING = {
	isPreview: false,
	isReview: false,
	labelPosition: "left",
	labelWidth: "100",
	size: "medium",
	disabled: false,
};

export const FORM_COLUMNS = [
	{
		el: "switch",
		prop: "isPreview",
		label: "规则",
		activeText: "true",
		inactiveText: "false",
		placeholder: "是否查看模式",
		span: 24,
	},
	{
		el: "switch",
		prop: "isReview",
		label: "规则",
		activeText: "true",
		inactiveText: "false",
		placeholder: "是否审批模式",
		span: 24,
	},
	{
		el: "switch",
		prop: "disabled",
		label: "规则",
		activeText: "true",
		inactiveText: "false",
		placeholder: "是否禁用",
		span: 24,
	},
	{
		el: "select",
		prop: "rules",
		label: "尺寸",
		placeholder: "请选择尺寸",
		span: 24,
		dataList: [
			{ label: "mini", prop: "mini" },
			{ label: "small", prop: "small" },
			{ label: "medium", prop: "medium" },
		],
	},
	{
		el: "input-number",
		prop: "labelWidth",
		label: "标签宽度(px)",
		placeholder: "请输入标签宽度值",
		span: 24,
		step: 10,
		min: 0,
	},
	{
		label: "对齐方式",
		el: "select",
		prop: "labelPosition",
		span: 24,
		dataList: [
			{
				label: "左对齐",
				value: "left",
			},
			{
				label: "右对齐",
				value: "right",
			},
			{
				label: "顶部对齐",
				value: "top",
			},
		],
	},
];

export const RULES = {
	required: {
		required: true,
		message: "请输入",
		trigger: "blur",
	},
	number: {
		type: "number",
		message: "请输入数字",
		trigger: "blur",
	},
};
