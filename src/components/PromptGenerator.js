// src/PromptGenerator.js
const prompts = [
    "Write about a time you were truly afraid.",
    "Describe your dream vacation.",
    "Write a story from the perspective of an animal.",
    "Write a story about a journey to a distant planet.",
  "Describe a day in the life of a medieval knight.",
  "Imagine a world where everyone has superpowers, but one person doesn't.",
  "Write a dialogue between two characters who are stuck in an elevator.",
  "Describe a mysterious object that appears in the middle of a busy city.",
  "Write a letter from a dragon to a princess.",
  "Imagine a world where technology has ceased to exist. How do people live?",
  "Write a story about finding a lost city under the sea.",
  "Describe the first contact between humans and aliens from the alien's perspective.",
  "Write a short story about a detective solving a mystery in a futuristic city."
  ];
  
  export const generateRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  };
  