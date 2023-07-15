<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="Settings"
    positive-text="Update"
    negative-text="Cancel"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    @close="() => emits('close')"
  >
    <n-p>Required</n-p>
    <n-input-number v-model:value="store.required" min="1" max="10" />
    <n-p>Teams</n-p>
    <n-input-number v-model:value="store.teams" min="1" :max="store.required" />
  </n-modal>
</template>

<script setup lang="ts">
import { useMessage, NModal, NInputNumber, NP } from "naive-ui";
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
  message.success(`${store.required} REQUIRED x ${store.teams} TEAMS`);
  showModal.value = false;
  emits("close");
};
const onNegativeClick = () => {
  showModal.value = false;
  emits("close");
};
</script>
