<template>
  <n-config-provider :theme-overrides="theme">
    <n-message-provider>
      <Icon
        size="1.5rem"
        style="position: absolute; top: 0; right: 0; padding: 1rem"
        @click="() => (showModal = true)"
        ><Settings />
      </Icon>
      <Icon
        size="1.5rem"
        style="position: absolute; top: 30px; right: 0; padding: 1rem"
        @click="toggleAudio"
        ><Music v-if="audioIsActive" />
        <MusicRemove v-else />
      </Icon>

      <Config :showModal="showModal" @close="() => (showModal = false)" />

      <canvas id="canvas" />

      <div id="welcome" v-if="!play">
        <n-h1 style="color: white">Spliteam</n-h1>
        <n-button type="success" @click="startPlaying">PLAY</n-button>
      </div>
      <Chooser v-else-if="canvas" :canvas="canvas" @reload="() => reload()" />

      <Footer />
      <audio id="myAudio">
        <source src="/music/fluffing-a-duck.mp3" type="audio/mpeg" />
      </audio>
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
import { Music, MusicRemove, Settings } from "@vicons/carbon";
import { theme } from "./theme";

const showModal = ref(false);
const reload = () => window.location.reload();

const canvas = ref<HTMLCanvasElement | null>(null);

const play = ref(false);
const audioIsActive = ref(true);
const myAudio = ref<HTMLAudioElement | null>(null);

onMounted(() => {
  canvas.value = document.getElementById("canvas") as HTMLCanvasElement;
  myAudio.value = document.getElementById("myAudio") as HTMLAudioElement;
  if (myAudio.value) {
    myAudio.value.volume = 0.1;
    myAudio.value.loop = true;
  }
});

const startPlaying = () => {
  play.value = true;
  if (audioIsActive.value) playAudio();
};

const toggleAudio = () => {
  audioIsActive.value = !audioIsActive.value;
  if (myAudio.value) {
    if (myAudio.value.paused && audioIsActive.value && play.value)
      myAudio.value.play();
    else if (!audioIsActive.value) myAudio.value.pause();
  }
};

const playAudio = () => {
  if (myAudio.value && audioIsActive.value) myAudio.value.play();
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
