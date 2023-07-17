<template></template>

<script setup lang="ts">
import { ref } from "vue";
import { useSettingsStore } from "../store/settings";
import { useMessage } from "naive-ui";

interface Touch {
  id: number;
  pageX: number;
  pageY: number;
  color: string;
}

const props = defineProps({
  canvas: {
    type: HTMLCanvasElement,
    default: null,
  },
});

const store = useSettingsStore();
const message = useMessage();

const DEFAULT_TIMEOUT = 500;
const DEFAULT_COLOR = "#303030";
const COLORS = [
  "#00A3EE",
  "#D80351",
  "#F9B700",
  "#FFA3B1",
  "#FFD1BA",
  "#B5EAD7",
  "#C7CEEA",
  "#FFDAC1",
  "#BDE0FE",
];
// const SHAPES = ["circle", "square", "triangle"];

const currentTouches = ref<Touch[]>([]);
const timeout = ref<NodeJS.Timeout | null>(null);

const ctx = props.canvas.getContext("2d")!;

const resizeCanvas = () => {
  props.canvas.width = window.innerWidth;
  props.canvas.height = window.innerHeight;
};

resizeCanvas();

window.addEventListener("resize", resizeCanvas, false);

window.addEventListener(
  "blur",
  () => {
    removeEvents();
    clearCanvas();
    clearData();
  },
  false
);
window.addEventListener(
  "focus",
  () => {
    addEvents();
    clearCanvas();
    clearData();
  },
  false
);

const findCurrentTouchIndex = (id: any) =>
  currentTouches.value.findIndex((touch) => touch.id === id);

const touchStarted = (event: TouchEvent) => {
  const touches = event.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    const touch = touches[i];
    const touchColor = DEFAULT_COLOR;

    currentTouches.value.push({
      id: touch.identifier,
      pageX: touch.pageX,
      pageY: touch.pageY,
      color: touchColor,
    });
  }
};

const touchMove = (event: TouchEvent) => {
  const touches = event.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    const touch = touches[i];
    const currentTouchIndex = findCurrentTouchIndex(touch.identifier);
    if (currentTouchIndex >= 0) {
      currentTouches.value[currentTouchIndex].pageX = touch.pageX;
      currentTouches.value[currentTouchIndex].pageY = touch.pageY;
    } else console.log("Touch was not found!");
  }
};

const touchEnded = (event: TouchEvent) => {
  const touches = event.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    const touch = touches[i];
    const currentTouchIndex = findCurrentTouchIndex(touch.identifier);
    if (currentTouchIndex >= 0)
      currentTouches.value.splice(currentTouchIndex, 1);
    else console.log("Touch was not found!");
  }
};

const onTouchStart = (e: TouchEvent) => {
  e.preventDefault();
  if (currentTouches.value.length >= store.people) return;
  touchStarted(e);
  draw();
  // if (
  //   store.people > store.maxTouchPoints &&
  //   currentTouches.value.length === store.maxTouchPoints
  // )
  //   message.info(`FIXED: ${store.maxTouchPoints} fingers`);
};

const onTouchMove = (e: TouchEvent) => {
  e.preventDefault();
  touchMove(e);
  draw();
};

const onTouchEnd = (e: TouchEvent) => {
  e.preventDefault();
  touchEnded(e);
  draw();
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, props.canvas.width, props.canvas.height);
};

const decideColors = () => {
  const colorsAvailable: string[] = [];
  for (let i = 0; i < store.people; i++)
    colorsAvailable.push(COLORS[i % store.teams]);
  colorsAvailable.sort(() => Math.random() - 0.5);

  currentTouches.value.forEach((touch, i) => {
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(touch.pageX, touch.pageY, 50, 0, 2 * Math.PI);
    ctx.fillStyle = colorsAvailable[i];
    ctx.fill();

    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(touch.pageX, touch.pageY, 56, 0, 2 * Math.PI);
    ctx.strokeStyle = colorsAvailable[i];
    ctx.lineWidth = 4;
    ctx.stroke();
  });
};

const removeEvents = () => {
  props.canvas.removeEventListener("touchstart", onTouchStart);
  props.canvas.removeEventListener("touchmove", onTouchMove);
  props.canvas.removeEventListener("touchend", onTouchEnd);
};

const addEvents = () => {
  props.canvas.addEventListener("touchstart", onTouchStart);
  props.canvas.addEventListener("touchmove", onTouchMove);
  props.canvas.addEventListener("touchend", onTouchEnd);
};

const clearData = () => {
  currentTouches.value = [];
};

const fix = () => {
  removeEvents();
  clearCanvas();
  decideColors();
  message.success("SPLIT UP!");
  setTimeout(() => {
    clearCanvas();
    clearData();
    addEvents();
  }, 5000);
};

const draw = () => {
  clearCanvas();
  currentTouches.value.forEach((touch) => {
    ctx.beginPath();
    ctx.arc(touch.pageX, touch.pageY, 50, 0, 2 * Math.PI);
    ctx.fillStyle = touch.color;
    ctx.fill();
  });

  if (currentTouches.value.length === store.people) {
    if (timeout.value) clearTimeout(timeout.value);
    timeout.value = setTimeout(() => fix(), DEFAULT_TIMEOUT);
  } else if (timeout.value) clearTimeout(timeout.value);
};

addEvents();
</script>
