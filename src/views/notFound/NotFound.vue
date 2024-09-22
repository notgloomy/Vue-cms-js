<script setup>
// eslint-disable-next-line no-undef
ElMessage({
  message: '出错啦,请联系管理员',
  type: 'error'
})
</script>

<template>
  <div class="notFound"></div>
</template>

<style scoped>
.notFound {
  width: 100%;
  height: 695px;
  background: url('../../assets/img/notFound.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
}
</style>
