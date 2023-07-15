<template>
  <n-message-provider>
    <Icon
      size="1.25rem"
      style="position: absolute; top: 0; right: 0; margin: 1rem"
      @click="
        () => {
          console.log('click');
          showModal = true;
        }
      "
      ><Settings />
    </Icon>
    <Config :showModal="showModal" @close="() => (showModal = false)" />
    <Chooser @reload="() => reload()" />
  </n-message-provider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Chooser from "./components/Chooser.vue";
import Config from "./components/Config.vue";
import { NMessageProvider } from "naive-ui";
import { Icon } from "@vicons/utils";
import { Settings } from "@vicons/carbon";

const showModal = ref(false);
const reload = () => window.location.reload();
</script>

<style scoped></style>
