import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const required = ref(4);
  const teams = ref(2);
  const setRequired = (value: number) => {
    required.value = value;
  };
  const setTeams = (value: number) => {
    teams.value = value;
  };
  return { required, teams, setRequired, setTeams };
});
