<template></template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { ref } from "vue";
import { useConfettiStore } from "../store/confetti";
import { useSettingsStore } from "../store/settings";

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
const confetti = useConfettiStore();
const message = useMessage();

const DEFAULT_TIMEOUT = 1000;
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

  for (const touch of touches) {
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

  for (const touch of touches) {
    const currentTouchIndex = findCurrentTouchIndex(touch.identifier);
    if (currentTouchIndex >= 0) {
      currentTouches.value[currentTouchIndex].pageX = touch.pageX;
      currentTouches.value[currentTouchIndex].pageY = touch.pageY;
    } else console.log("Touch was not found!");
  }
};

const touchEnded = (event: TouchEvent) => {
  const touches = event.changedTouches;

  for (const touch of touches) {
    const currentTouchIndex = findCurrentTouchIndex(touch.identifier);
    if (currentTouchIndex >= 0)
      currentTouches.value.splice(currentTouchIndex, 1);
    else console.log("Touch was not found!");
  }
  if (timeout.value) clearTimeout(timeout.value);
};

const onTouchStart = (e: TouchEvent) => {
  e.preventDefault();
  if (currentTouches.value.length >= store.people) return;
  touchStarted(e);
  draw();
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

    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(touch.pageX, touch.pageY, 60, 0, 2 * Math.PI);
    ctx.strokeStyle = colorsAvailable[i];
    ctx.lineWidth = 6;
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
  timeout.value = null;
};

const fix = () => {
  removeEvents();
  clearCanvas();
  decideColors();
  message.success("SPLIT UP!");
  confetti.showConfetti();
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

  if (currentTouches.value.length === store.people && !timeout.value) {
    // if (timeout.value) clearTimeout(timeout.value);
    timeout.value = setTimeout(() => fix(), DEFAULT_TIMEOUT);
  }
  // else if (timeout.value) clearTimeout(timeout.value);
};

addEvents();
</script>
