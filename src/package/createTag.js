export default function (h, { column, row = {}, $index, isPreview, isReview }) {
  let VNode = null
  const scopedSlots = this.scopedSlots || this.$scopedSlots
  const slots = this.slots && this.slots()

  if (scopedSlots && column.prop && scopedSlots[column.prop]) {
    VNode = scopedSlots[column.prop]({ row, column, $index })
  } else if (slots && column.prop && slots[column.prop]) {
    VNode = slots[column.prop]
  }
  return VNode || h('DlrItem', {
    props: {
      row,
      column,
      isPreview,
      isReview,
      $index
    }
  })
}
