import DlrForm from './DlrForm'
import DlrItem from './DlrItem'
import DlrSelect from './DlrSelect'
import DlrTable from './DlrTable'
const install = function(Vue) {
  if (install.installed) return
  if (!Vue.prototype.$ELEMENT) {
    throw new Error('请先安装element-ui')
  }
  Vue.component(DlrForm.name, DlrForm)
  Vue.component(DlrItem.name, DlrItem)
  Vue.component(DlrSelect.name, DlrSelect)
  Vue.component(DlrTable.name, DlrTable)
  install.installed = true
}
if (window && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  DlrForm,
  DlrItem,
  DlrTable
}
