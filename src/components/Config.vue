<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    :show-icon="false"
    preset="dialog"
    title="Settings"
    positive-text="Update"
    negative-text="Cancel"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    @close="() => emits('close')"
  >
    <div style="display: flex; flex-direction: column; gap: 0.5rem">
      <n-p>Max Touch Points: {{ store.maxTouchPoints }}</n-p>
      <n-divider />
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          justify-content: space-between;
        "
      >
        <n-text
          >People: <n-text type="info"> {{ store.people }}</n-text></n-text
        >
        <div
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
            justify-content: space-between;
          "
        >
          <n-button
            size="medium"
            @click="() => (store.people -= 1)"
            :disabled="store.people === 1"
            ><Icon><Subtract /></Icon
          ></n-button>
          <n-button size="medium" @click="() => (store.people += 1)"
            ><Icon><Add /></Icon
          ></n-button>
        </div>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          justify-content: space-between;
        "
      >
        <n-text
          >Teams: <n-text type="info"> {{ store.teams }}</n-text></n-text
        >
        <div
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
            justify-content: space-between;
          "
        >
          <n-button
            size="medium"
            @click="() => (store.teams -= 1)"
            :disabled="store.teams === 1"
            ><Icon><Subtract /></Icon
          ></n-button>
          <n-button size="medium" @click="() => (store.teams += 1)"
            ><Icon><Add /></Icon
          ></n-button>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { Add, Subtract } from "@vicons/carbon";
import { Icon } from "@vicons/utils";
import { NButton, NDivider, NModal, NP, NText, useMessage } from "naive-ui";
import { ref, watch } from "vue";
import { useSettingsStore } from "../store/settings";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["close"]);

const store = useSettingsStore();

const message = useMessage();

const showModal = ref(false);

watch(
  () => props.showModal,
  (value) => (showModal.value = value)
);

const onPositiveClick = () => {
  message.success(`${store.people} People / ${store.teams} Teams`);
  showModal.value = false;
  emits("close");
};
const onNegativeClick = () => {
  showModal.value = false;
  emits("close");
};
</script>
