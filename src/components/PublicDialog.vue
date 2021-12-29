<template>
  <el-dialog
    :visible="show"
    :width="width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    center
    append-to-body
    @close="close"
    :show-close="true"
    class="public-dialog"
  >
    <template slot="title">
      <span class="public-dialog-header-title">{{ title }}</span>
    </template>
    <slot name="body" />
    <template slot="footer" class="dialog-footer">
      <slot name="action" />
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "PublicDialog",
  props: {
    show: Boolean,
    title: {
      type: [String, Number],
    },
    width: {
      type: String,
      default: "50%",
    },
  },
  data() {
    return {
    };
  },
  methods: {

    close() {
      this.$emit("close");
    },
  },
};
</script>