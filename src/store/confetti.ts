import JSConfetti from "js-confetti";
import { defineStore } from "pinia";
import { ref } from "vue";

const emojis = ["🦄", "🌈", "⚡️", "🌸", "🌼", "🎉", "🧨", "🏐", "🏀", "⚽"];

export const useConfettiStore = defineStore("confetti", () => {
  const jsConfetti = ref(new JSConfetti());

  const showConfetti = () => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    console.info("showing confetti with emoji", randomEmoji);
    jsConfetti.value.addConfetti({
      emojis: [randomEmoji],
      emojiSize: 100,
      confettiNumber: 50,
    });
  };
  return { showConfetti };
});
