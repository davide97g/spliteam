<template>
  <canvas id="canvas" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const { required, teams } = defineProps({
  required: {
    type: Number,
    default: 4,
  },
  teams: {
    type: Number,
    default: 2,
  },
});

const emits = defineEmits(["reload"]);

const DEFAULT_TIMEOUT = 1000;
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

const currentTouches = ref<any[]>([]);
const timeout = ref<any>(null);

setTimeout(() => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas, false);

  const findCurrentTouchIndex = function (id: any) {
    for (let i = 0; i < currentTouches.value.length; i++) {
      if (currentTouches.value[i].id === id) {
        return i;
      }
    }

    // Touch not found! Return -1.
    return -1;
  };

  const touchStarted = function (event: TouchEvent) {
    const touches = event.changedTouches;

    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      const touchColor = "#3F3F3F";

      currentTouches.value.push({
        id: touch.identifier,
        pageX: touch.pageX,
        pageY: touch.pageY,
        color: touchColor,
      });
    }
  };

  const touchEnded = function (event: TouchEvent) {
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
    if (e.touches.length > required) return;
    touchStarted(e);
    draw();
  };

  const onTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    touchEnded(e);
    draw();
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const decideColors = () => {
    const colorsAvailable: string[] = [];
    for (let i = 0; i < required; i++) colorsAvailable.push(COLORS[i % teams]);
    colorsAvailable.sort(() => Math.random() - 0.5);

    currentTouches.value.forEach((touch, i) => {
      ctx.beginPath();
      ctx.arc(touch.pageX, touch.pageY, 50, 0, 2 * Math.PI);
      ctx.fillStyle = colorsAvailable[i];
      ctx.fill();
    });
  };

  const fix = () => {
    canvas.removeEventListener("touchstart", onTouchStart);
    canvas.removeEventListener("touchend", onTouchEnd);
    clearCanvas();
    decideColors();
    setTimeout(() => emits("reload"), 10000);
  };

  const draw = () => {
    clearCanvas();
    currentTouches.value.forEach((touch) => {
      ctx.beginPath();
      ctx.arc(touch.pageX, touch.pageY, 50, 0, 2 * Math.PI);
      ctx.fillStyle = touch.color;
      ctx.fill();
    });

    if (currentTouches.value.length === required) {
      if (timeout.value) clearTimeout(timeout.value);
      timeout.value = setTimeout(() => fix(), DEFAULT_TIMEOUT);
    } else if (timeout.value) clearTimeout(timeout.value);
  };

  canvas.addEventListener("touchstart", onTouchStart);
  canvas.addEventListener("touchend", onTouchEnd);
}, 100);
</script>
