<script setup>
import { CountUp } from 'countup.js'
import { onMounted } from 'vue'
import { ref } from 'vue'
const props = defineProps({
  amount: {
    type: String,
    default: ''
  },
  number1: {
    type: Number,
    default: 0
  },
  number2: {
    type: Number,
    default: 0
  },
  subtitle: {
    type: String,
    default: ''
  },
  tips: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})

const count1Ref = ref('')
const count2Ref = ref('')
onMounted(() => {
  const count1 = new CountUp(count1Ref.value, props.number1)
  const count2 = new CountUp(count2Ref.value, props.number2)
  count1.start()
  count2.start()
})
</script>

<template>
  <div class="goodsInfo">
    <div class="goods-header">
      <div class="left">{{ title }}</div>
      <div class="right">
        <el-tooltip :content="tips" placement="top" effect="light">
          <el-icon><Warning /></el-icon>
        </el-tooltip>
      </div>
    </div>

    <div class="goods-num">
      <span v-if="amount === 'saleroom'">￥</span>
      <span ref="count1Ref" v-number>{{ number1 }}</span>
    </div>
    <div class="goodsSum">
      {{ subtitle }}
      <span v-if="amount === 'saleroom'">￥</span>
      <span v-number ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.goodsInfo {
  padding: 10px;
  background-color: #fff;
  .goods-header {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #a8a9aa;
  }
  .goods-num {
    padding: 10px 0;
    font-size: 24px;
    border-bottom: 1px solid #f0f0f0;
  }
  .goodsSum {
    margin-top: 10px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
