<template>
  <div v-if="show" class="modal-wrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    show: false
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.modal-wrap{
  position: fixed;
  z-index: 99999999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .6);
}
</style>