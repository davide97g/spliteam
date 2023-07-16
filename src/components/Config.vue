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
    <n-p>Max Touch Points: {{ store.maxTouchPoints }}</n-p>
    <n-divider />
    <n-p>People</n-p>
    <n-input-number v-model:value="store.people" min="1" />
    <n-p>Teams</n-p>
    <n-input-number v-model:value="store.teams" min="1" :max="store.people" />
  </n-modal>
</template>

<script setup lang="ts">
import { useMessage, NModal, NInputNumber, NP, NDivider } from "naive-ui";
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
