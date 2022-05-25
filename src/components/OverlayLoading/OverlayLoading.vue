<template>
  <Overlay :show="show" @click="overlayClick" class-name="overlay-cover">
    <div class="wrapper" @click.stop>
      <div class="block" >
        <div class="content-style" v-if="content">
          {{content}}
        </div>
        <slot v-else></slot>
      </div>
    </div>
  </Overlay>
</template>

<script setup lang="ts">
import { Overlay } from 'vant'
import { toRefs } from 'vue'
const props = defineProps<{
  show: boolean,
  content: string
}>()

const { show, content } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:show', show:boolean): void
}>()

const overlayClick = () => {
  emit('update:show', false)
}

</script>

<style lang="scss" scoped>
.overlay-cover {
  background: rgba(49, 53, 60, .5);
}
.wrapper { // Overlay
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 260px;
  height: 260px;
  background: $black;
  opacity: .5;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-style {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  color: #fff;
}
</style>