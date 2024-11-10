<script setup lang="ts">
import { getRandom } from "~/utils";

const props = defineProps<{
  num: number;
  delay: number;
}>();
const rotate = ref(getRandom(-15, 15));
const rotateOld = ref();
const key = ref(new Date().getTime());
const numCurrent = ref(props.num);
const numOld = ref<null | number>(null);

watch(
  () => props.num,
  (newValue, oldValue) => {
    // console.log("num", props.num);
    numOld.value = oldValue;
    numCurrent.value = newValue;
    rotateOld.value = rotate.value;
    rotate.value = getRandom(-15, 15);
    key.value = Date.now();
  },
);
</script>

<template>
  <div>
    <div v-show="numOld !== null" :key="key" class="find-out" :style="`animation-delay: 0.${delay}s;`">
      <div :style="`transform: rotate(${rotateOld}deg)`">{{ numOld }}</div>
    </div>
    <div :key="key" class="find-in" :style="`animation-delay: 0.${4 + delay}s;`">
      <div :style="`transform: rotate(${rotate}deg)`">{{ numCurrent }}</div>
    </div>
  </div>
</template>

<style scoped>
.find-in {
  transition: transform 3s ease;
  width: 0.5em;
  transform: translateY(120%);
  /* animation: findIn 3s cubic-bezier(0.4, 1.7, 0.85, 0.9) forwards; */
  animation: findIn 3s cubic-bezier(0.3, 1.3, 1, 0.98) forwards;
}

.find-out {
  position: absolute;
  animation: findOut 1s cubic-bezier(0.7, 0, 0.9, 0.3) forwards;
}

@keyframes findIn {
  from {
    transform: translateY(120%);
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
    transform: translateY(-120%);
    display: none;
  }
}
</style>
