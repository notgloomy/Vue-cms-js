<script setup>
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="main-menu">
    <el-menu
      background-color="#001529"
      :default-active="$route.path"
      :collapse="props.isCollapse"
      text-color="#fff"
      router
    >
      <div class="bgheader">
        <div class="bg"></div>
        <div class="bgtext">{{ props.isCollapse ? '' : '弘源管理系统' }}</div>
      </div>
      <template v-for="item in userStore.userMenu" :key="item.id">
        <el-sub-menu :index="item.url">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('el-icon-')[1]" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <template v-for="iten in item.children" :key="iten.id">
              <el-menu-item :index="iten.url">{{ iten.name }}</el-menu-item>
            </template>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;
  .el-menu {
    height: 100%;
    border-right: none;
    user-select: none;
  }
  .bgheader {
    width: 200px;
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .bg {
      width: 30px;
      height: 30px;
      background: url('../../../assets/img/logo.svg');
      background-size: 100%;
    }
    .bgtext {
      width: 120px;
      font-size: 20px;
      color: #fff;
      font-weight: 600;
    }
  }
}
</style>
