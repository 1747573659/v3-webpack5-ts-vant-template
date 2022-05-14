<template>
  <van-dialog class="wallet-dialog" v-model:show="show">
    <div class="content">确定要执行提现操作吗？</div>
    <template #footer>
      <div class="footer">
        <van-button type="default" @click="onShowDialog"><span class="text">取消</span></van-button>
        <van-button type="default" class="confirm" @click="confirmWithdraw" :disabled="confirmBtnDisabled">
          <span class="text">
            确定提现
            <span v-if="confirmBtnDisabled">
              ({{countDown.current.value.seconds}}S)
            </span>
          </span>
        </van-button>
      </div>
    </template>
  </van-dialog>
</template>

<script lang="ts" setup>
import { useCountDown } from '@vant/use';
import { computed, toRefs, watch } from 'vue';
const countDown = useCountDown({
  // 倒计时 3 S
  time: 4 * 1000,
});
const resetCountDown = () => {
  countDown.reset()
  countDown.start()
}
const confirmBtnDisabled = computed<boolean>(() => !!countDown.current.value.seconds)


const props = defineProps<{
  show: boolean
}>()
const emits = defineEmits<{
  (e: 'update:show', show:boolean): void,
  (e: 'confirmWithdraw'): void
}>()
const { show } = toRefs(props)

// 当弹窗显示的时候重置定时器
watch(show, () => {
  show.value && resetCountDown()
})

const onShowDialog = () => {
  emits('update:show', false)
}

const confirmWithdraw = () => {
  emits('confirmWithdraw')
}
</script>

<style lang="scss">
.wallet-dialog {
  border-radius: 20px;
  width: calc(100% - 48px);
  .van-dialog__content {
    min-height: 155px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    color: $font-color-1;
  }
  .footer {
    display: flex;
    border-top: 1px solid $bg-light-color-2;
    .van-button {
      flex: 1;
      border: none;
      border-radius: 0;
      .text {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 32px;
        color: $primaryColor;
      }
    }
    .confirm {
      border-left: 1px solid $bg-light-color-2;
    }
  }
}
</style>