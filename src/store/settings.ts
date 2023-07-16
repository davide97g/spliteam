import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const people = ref(4);
  const teams = ref(2);
  const maxTouchPoints = navigator.maxTouchPoints;
  const setPeople = (value: number) => (people.value = value);
  const setTeams = (value: number) => (teams.value = value);
  return { people, teams, maxTouchPoints, setPeople, setTeams };
});
