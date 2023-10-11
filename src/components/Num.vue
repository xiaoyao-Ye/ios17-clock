<script setup lang="ts">
const props = defineProps<{
  num: number;
  delay: number;
}>();
const nums = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const rotate = ref(getRandom(-15, 15));
const rotate_old = ref();
const isFirst = ref(true);
function getRandom(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
watch(
  () => props.num,
  () => {
    const random = getRandom(-15, 15);
    if (isFirst.value && rotate_old.value) isFirst.value = false;
    rotate_old.value = rotate.value;
    rotate.value = random;
  },
);
</script>

<template>
  <div>
    <div v-for="value in nums" :key="value">
      <div v-show="!isFirst && num === value + 1" class="find-out" :style="`animation-delay: 0.${delay}s;`">
        <div :style="`transform: rotate(${rotate_old}deg)`">
          {{ value === -1 ? "9" : value }}
        </div>
      </div>
      <div v-show="num === value" class="find-in" :style="`animation-delay: 0.${4 + delay}s;`">
        <div :style="`transform: rotate(${rotate}deg)`">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.find-in {
  transition: all 3s ease;
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
