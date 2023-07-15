<template>
  <Settings
    :required="required"
    :teams="teams"
    @updateRequired="(r) => (required = r)"
    @updateTeams="(t) => (teams = t)"
    @reload="() => reload()"
  />
  <Chooser :required="required" :teams="teams" @reload="() => reload()" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Chooser from "./components/Chooser.vue";
import Settings from "./components/Settings.vue";

const required = ref(4);
const teams = ref(2);

const reload = () => window.location.reload();
</script>

<style scoped></style>
