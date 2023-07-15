<template>
  <div
    style="
      position: absolute;
      top: 0px;
      width: calc(100% - 20px);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 10px;
    "
  >
    <div>
      <h2>Required</h2>
      <input
        type="number"
        v-model="required"
        @change="() => emits('updateRequired', required)"
      />
      <h2>Teams</h2>
      <input
        type="number"
        v-model="teams"
        @change="() => emits('updateTeams', teams)"
      />
    </div>
    <button @click="() => emits('reload')">Reload</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  required: {
    type: Number,
    default: 4,
  },
  teams: {
    type: Number,
    default: 2,
  },
});

const emits = defineEmits(["updateRequired", "updateTeams", "reload"]);

const required = ref(props.required);
const teams = ref(props.teams);
</script>
