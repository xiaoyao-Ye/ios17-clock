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

const timeList = ref<number[]>([-1, -1, -1, -1]);
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

  const nextMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0);
  const timeDifference = nextMinute.getTime() - now.getTime();
  // const timeDifference = 5000

  timeID.value = setTimeout(updateClock, timeDifference);
}
function getRandom(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
updateClock();

window.addEventListener("resize", calculateFontSize);
function calculateFontSize() {
  const windowWidth = window.innerWidth;
  const fontSize = windowWidth / 10 + "px"; // 将窗口宽度的十分之一作为字体大小的基准
  document.documentElement.style.fontSize = fontSize;
}
calculateFontSize();

onUnmounted(() => {
  clearInterval(timeID.value);
});

const rotate = ref(getRandom(-12, 12));
const pointStyle = `transform: rotate(${rotate}deg); transition: all 3s ease;color:#fff;text-shadow:0px 0px 7px rgba(255, 255, 255, 0.8);z-index: 1;`;
const colors = ["color: rgba(81,241,177,0.6)", "color: rgba(135,255,161,0.8)"];
</script>

<template>
  <div h-full w-full flex items-center justify-center overflow-hidden text-3.5rem>
    <Num :num="timeList[0]" :delay="delayList[0]" :style="colors[0]" />
    <Num :num="timeList[1]" :delay="delayList[1]" :style="colors[1]" />
    <div :style="pointStyle">:</div>
    <Num :num="timeList[2]" :delay="delayList[2]" :style="colors[0]" />
    <Num :num="timeList[3]" :delay="delayList[3]" :style="colors[1]" />
  </div>
</template>

<style>
/* @import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap"); */
/* @import url("https://fonts.googleapis.com/css2?family=Lilita+One&family=Pacifico&display=swap"); */
/* @import url("./assets/fonts/Pacifico/index.css"); */
@import url("./assets/fonts/LilitaOne/index.css");

* {
  user-select: none;
}

html {
  font-weight: 900;
  line-height: 1;
  /* font-family: "Pacifico", cursive !important; */
  font-family: "Lilita One", cursive !important;
}

#app {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
</style>
