<script setup lang="ts">
const props = defineProps<{
  timeList: string[]
}>()
let originalTimeList = props.timeList
const delays = ref<string[]>([])

watchEffect(() => {
  let i = 0
  const list: string[] = []
  props.timeList.forEach((f, index) => {
    list[index] = 'transition-delay: 0s;'
    if (f !== originalTimeList[index]) {
      list[index] = i ? `transition-delay: 0.${i * 2}s` : 'transition-delay: 0s'
      i++
    }
    delays.value = list
  })
  // console.log('( len )===============>', props.timeList.filter((f, index) => f !== originalTimeList[index]))
  originalTimeList = props.timeList
})
</script>

<template>
  <div flex>
    <!-- {{ delays }} -->
    <Transition mode="out-in" name="fade">
      <span :key="props.timeList[0]" :style="delays[0]">{{ props.timeList[0] }}</span>
    </Transition>
    <Transition mode="out-in" name="fade">
      <span :key="props.timeList[1]" :style="delays[1]">{{ props.timeList[1] }}</span>
    </Transition>
    <Transition mode="out-in" name="fade">
      <span :key="props.timeList[2]" :style="delays[2]">{{ props.timeList[2] }}</span>
    </Transition>
    <Transition mode="out-in" name="fade">
      <span :key="props.timeList[3]" :style="delays[3]">{{ props.timeList[3] }}</span>
    </Transition>
    <Transition mode="out-in" name="fade">
      <span :key="props.timeList[4]" :style="delays[4]">{{ props.timeList[4] }}</span>
    </Transition>
    <Transition mode="out-in" name="fade">
      <span :key="props.timeList[5]" :style="delays[5]">{{ props.timeList[5] }}</span>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-to,
.fade-leave-from {
  transform: translateY(0);
}

.fade-enter-from {
  transform: translateY(100%);
}

.fade-enter-active {
  transition: all 1s cubic-bezier(0.3, 1.3, 1, 0.98);
  transition-delay: 0s;
}

.fade-leave-to {
  transform: translateY(-100%);
}

.fade-leave-active {
  transition: all 1s cubic-bezier(0.7, 0, 0.9, 0.3);
  transition-delay: 0s;
}

/* .num:nth-child(1) {
  animation-delay: 0.1s;
}

.num:nth-child(2) {
  animation-delay: 0.2s;
}

.num:nth-child(3) {
  animation-delay: 0.3s;
}

.num:nth-child(4) {
  animation-delay: 0.4s;
}

.num:nth-child(5) {
  animation-delay: 0.5s;
}

.num:nth-child(6) {
  animation-delay: 0.6s;
} */

/* .find-in {
  transform: translateY(100vh);
  animation: findIn 0.6s 0.2s cubic-bezier(0.4, 1.7, 0.85, 0.9) forwards;
  animation: findIn 1s 0.4s cubic-bezier(0.3, 1.3, 1, 0.98) forwards;
}

.find-out {
  animation: findOut 1s cubic-bezier(0.7, 0, 0.9, 0.3) forwards;
}

@keyframes findIn {
  from {
    transform: translateY(100vh);
  }

  to {
    transform: translateY(0px);
  }
}

@keyframes findOut {
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-100vh);
    display: none;
  }
} */
</style>
