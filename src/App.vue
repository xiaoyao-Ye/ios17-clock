<script setup lang="ts">
const GitHub = "_Ghosteye";
console.log(
  `\n %c Welcome to ${GitHub} %c https://github.com/xiaoyao-Ye \n\n`,
  "color: #ffffff; background: #3c9cff; padding:5px 0; border-radius: 5px;",
  "",
);

function padStart(num: number, len: number = 2, str: string = "0") {
  return num.toString().padStart(len, str);
}

const timeList = ref<number[]>([-1, -1, -1, -1, -1, -1]);
const delayList = ref<number[]>([]);
const timeID = ref<NodeJS.Timeout | string | number | undefined>();

function getDelay(newTimeList: number[]) {
  let i = 0;
  const list: number[] = [];
  timeList.value.forEach((f, index) => {
    list[index] = 0;
    if (f !== newTimeList[index]) {
      list[index] = i;
      i++;
    }
  });
  delayList.value = list;
}

function updateClock() {
  const now = new Date();
  const hours = padStart(now.getHours());
  const minutes = padStart(now.getMinutes());
  const seconds = padStart(now.getSeconds());
  const newTimeList: number[] = [...hours.split(""), ...minutes.split(""), ...seconds.split("")].map(f => +f);
  getDelay(newTimeList);
  timeList.value = newTimeList;
  // console.log('( timeList.value )===============>', timeList.value)

  // 计算下一分钟的时间
  const nextMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0);
  const timeDifference = nextMinute.getTime() - now.getTime();
  // const timeDifference = 5000

  // 设置下一次的定时
  timeID.value = setTimeout(updateClock, timeDifference);
}
function getRandom(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
const rotate = ref(getRandom(-15, 15));
updateClock();

onUnmounted(() => {
  clearInterval(timeID.value);
});
</script>

<template>
  <div h-full w-full flex items-center justify-center overflow-hidden text-13rem>
    <Num :num="timeList[0]" :delay="delayList[0]" />
    <Num :num="timeList[1]" :delay="delayList[1]" />
    <div :style="`transform: rotate(${rotate}deg);padding-bottom: 100px;`">:</div>
    <Num :num="timeList[2]" :delay="delayList[2]" />
    <Num :num="timeList[3]" :delay="delayList[3]" />
    <!-- <Num :num="timeList[4]" :delay="delayList[4]" /> -->
    <!-- <Num :num="timeList[5]" :delay="delayList[5]" /> -->
    <!-- <Clock :time-list="timeList" /> -->
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lilita+One&family=Pacifico&display=swap");

html {
  font-size: 50px;
  font-weight: 900;
  line-height: 1;
  font-family: "Pacifico", cursive !important;
}
.font-sans {
  font-family: "Pacifico", cursive !important;
  font-family: "Lilita One", cursive !important;
}
</style>
