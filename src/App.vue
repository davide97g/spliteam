<template>
  <n-message-provider>
    <Icon
      size="1.5rem"
      style="position: absolute; top: 0; right: 0; padding: 1rem"
      @click="() => (showModal = true)"
      ><Settings />
    </Icon>
    <Config :showModal="showModal" @close="() => (showModal = false)" />
    <canvas id="canvas" />
    <Chooser v-if="readyCanvas" @reload="() => reload()" />
    <Footer />
  </n-message-provider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Chooser from "./components/Chooser.vue";
import Config from "./components/Config.vue";
import Footer from "./components/Footer.vue";
import { NMessageProvider } from "naive-ui";
import { Icon } from "@vicons/utils";
import { Settings } from "@vicons/carbon";

const showModal = ref(false);
const reload = () => window.location.reload();

const readyCanvas = ref(false);
setTimeout(() => (readyCanvas.value = true), 1000);
</script>

<style scoped></style>
