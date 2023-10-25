<script setup lang="ts">
const props = defineProps<{
  num: number;
  delay: number;
}>();
// const nums = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const rotate = ref(getRandom(-15, 15));
const rotate_old = ref();
const key = ref(new Date().getTime());
const num_current = ref(props.num);
const num_old = ref();
function getRandom(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
watch(
  () => props.num,
  newValue => {
    console.log("num", props.num);
    num_old.value = num_current.value;
    num_current.value = newValue;
    rotate_old.value = rotate.value;
    rotate.value = getRandom(-15, 15);
    key.value = new Date().getTime();
    // const random = getRandom(-15, 15);
    // if (isFirst.value && !oldNum.value) isFirst.value = false;
    // rotate_old.value = rotate.value;
    // rotate.value = random;
    // if (!isFirst.value) oldNum.value = currentNum.value;
    // currentNum.value = props.num;
  },
);
</script>

<template>
  <div>
    <!-- <div v-for="value in nums" :key="value"> -->
    <!-- <div v-show="!isFirst && num === value + 1" class="find-out" :style="`animation-delay: 0.${delay}s;`"> -->
    <!-- <div :style="`transform: rotate(${rotate_old}deg)`"> -->
    <!-- 这里value===-1时, 秒是9十秒是5?,分是9十分是5?,时是2,小时是4  所以还是要记录old和new -->
    <!-- {{ value === -1 ? "9" : value }} -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- <div v-show="num === value" class="find-in" :style="`animation-delay: 0.${4 + delay}s;`"> -->
    <!-- <div :style="`transform: rotate(${rotate}deg)`"> -->
    <!-- {{ value }} -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- </div> -->
    <div v-show="num_old" :key="key" class="find-out" :style="`animation-delay: 0.${delay}s;`">
      <div :style="`transform: rotate(${rotate_old}deg)`">{{ num_old }}</div>
    </div>
    <div :key="key" class="find-in" :style="`animation-delay: 0.${4 + delay}s;`">
      <div :style="`transform: rotate(${rotate}deg)`">{{ num_current }}</div>
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
