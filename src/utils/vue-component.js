function slotFn(array = [], string = '') {
    array.forEach(element => {
        string += ` 
        <template slot="${element.model}" slot-scope="scope">
            <!-- ${element.name} -->
            <!-- v-model="scope.model.${element.model}" -->
        </template>
      `
    });
    return string
}

function optionFn(array = [], string = '{') {
    array.forEach(element => {
        string += `
                ${element}: [],`
    });
    return string + (!array.length ? '}' : `
            }`)
}

function template(data) {
    if (data.type === 'form') {
        return `
    <template>
        <div>
            <dlr-form 
                class="dlrForm"
                ref="dlrForm"
                :formData="forms"
                :isPreview="${data.config.isPreview}"
                :isReview="${data.config.isReview}"
                :labelPosition="${data.config.labelPosition}"
                :labelWidth="${data.config.labelWidth}px"
                :size="${data.config.size}"
                :disabled="${data.config.disabled}"
                :columns="columns"
                >
            </dlr-form>
        </div>
    </template>
        
    <script>
    export default {
        data () {
            return {
                forms: ${JSON.stringify(data.form)},
                columns: ${JSON.stringify(data.column)}
            }
        },
        methods: {
        }
    }
    </script>
    `
    } else {
        return `
    <template>
        <dlr-table
            id="dlr-table"
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
    </template>
        
    <script>
    export default {
        name: "Dlr-Table",
        data() {
            return {
                tableData:  ${JSON.stringify(data.form)},
                options:  ${JSON.stringify(data.config)},
                pageInfo: {
                    pageSize: 20,
                    pageNum: 1,
                    total: 0,
                },
                columns: ${JSON.stringify(data.column)}
            };
        },
        methods: {
            pageChange(pageInfo) {
                this.pageInfo = pageInfo;
            },
        },
    }
    </script>
    `
    }
}

export default function (data) {
    return template(data)
}