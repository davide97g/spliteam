<template>
  <div style="position: absolute; top: 10px; left: 10px">
    <p>
      {{ currentTouches.map((touch) => touch.id).join(", ") }}
    </p>
    <p v-if="message">
      {{ message }}
    </p>
  </div>
  <canvas id="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref } from "vue";

//-------------------------//
// Initialization and
// Global constiables
//-------------------------//

// Used to keep track of active touches.
const currentTouches = ref<any[]>([]);
const message = ref("");

// Get the canvas.
setTimeout(() => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (!canvas) return;

  console.log("canvas", canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.addEventListener("resize", resizeCanvas, false);

  resizeCanvas();

  //-------------------------//
  // Helper Methods
  //-------------------------//

  // Returns a random color from an array.
  const randomColor = function () {
    const colors = ["#3F3F3F", "#929292", "#00A3EE", "#F5D908", "#D80351"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Finds the array index of a touch in the currentTouches.value array.
  const findCurrentTouchIndex = function (id: any) {
    for (let i = 0; i < currentTouches.value.length; i++) {
      if (currentTouches.value[i].id === id) {
        return i;
      }
    }

    // Touch not found! Return -1.
    return -1;
  };

  //-------------------------//
  // Handler Methods
  //-------------------------//

  // Creates a new touch in the currentTouches.value array and draws the starting
  // point on the canvas.
  const touchStarted = function (event: any) {
    const touches = event.changedTouches;
    message.value = `touchStarted: ${JSON.stringify(touches)}`;

    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      const touchColor = randomColor();

      currentTouches.value.push({
        id: touch.identifier,
        pageX: touch.pageX,
        pageY: touch.pageY,
        color: touchColor,
      });
    }
  };

  // Draws a line to the final touch position on the canvas and then
  // removes the touh from the currentTouches.value array.
  const touchEnded = function (event: any) {
    const touches = event.changedTouches;
    message.value = `touchEnded: ${JSON.stringify(touches)}`;

    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      const currentTouchIndex = findCurrentTouchIndex(touch.identifier);
      if (currentTouchIndex >= 0)
        currentTouches.value.splice(currentTouchIndex, 1);
      else console.log("Touch was not found!");
    }
  };

  //-------------------------//
  // Event Listeners
  //-------------------------//

  const draw = () => {
    // clean the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentTouches.value.forEach((touch) => {
      ctx.beginPath();
      ctx.arc(touch.pageX, touch.pageY, 50, 0, 2 * Math.PI);
      ctx.fillStyle = touch.color;
      ctx.fill();
    });
  };

  // Set up an event listener for new touches.
  canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    touchStarted(e);
    draw();
  });

  // Set up an event listener for when a touch ends.
  canvas.addEventListener("touchend", function (e) {
    e.preventDefault();
    touchEnded(e);
    draw();
  });
}, 1000);
</script>

<style scoped></style>
