<template>
  <div
    style="
      position: absolute;
      bottom: 0;
      width: calc(100% - 20px);
      padding: 10px;
    "
  >
    <n-p style="color: white"> v{{ packageJson.version }} </n-p>
  </div>
</template>

<script setup lang="ts">
import { NP } from "naive-ui";
import packageJson from "../../package.json";
</script>
