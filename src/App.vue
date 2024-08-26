<template>
  <n-config-provider :theme-overrides="theme">
    <n-message-provider>
      <Icon
        size="1.5rem"
        style="position: absolute; top: 0; right: 0; padding: 1rem"
        @click="() => (showModal = true)"
        ><Settings />
      </Icon>

      <Config :showModal="showModal" @close="() => (showModal = false)" />

      <canvas id="canvas" />

      <div id="welcome" v-if="!play">
        <n-h1 style="color: white">Spliteam</n-h1>
        <n-button type="success" @click="startPlaying">PLAY</n-button>
      </div>
      <Chooser v-else-if="canvas" :canvas="canvas" />

      <Footer />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Chooser from "./components/Chooser.vue";
import Config from "./components/Config.vue";
import Footer from "./components/Footer.vue";
import { NMessageProvider, NButton, NH1, NConfigProvider } from "naive-ui";
import { Icon } from "@vicons/utils";
import { Settings } from "@vicons/carbon";
import { theme } from "./theme";

const showModal = ref(false);

const canvas = ref<HTMLCanvasElement | null>(null);

const play = ref(false);

onMounted(() => {
  canvas.value = document.getElementById("canvas") as HTMLCanvasElement;
});

const startPlaying = () => {
  play.value = true;
};
</script>

<style scoped lang="css">
#welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 150px);
}
</style>
