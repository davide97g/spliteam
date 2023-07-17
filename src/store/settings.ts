import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const maxTouchPoints = navigator.maxTouchPoints;
  const people = ref(Math.min(navigator.maxTouchPoints, 4));
  const teams = ref(Math.min(navigator.maxTouchPoints, 2));
  const setPeople = (value: number) => (people.value = value);
  const setTeams = (value: number) => (teams.value = value);
  return { people, teams, maxTouchPoints, setPeople, setTeams };
});
