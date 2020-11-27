import { reactive, readonly } from "vue";

const state = reactive({
  quizMode: false,
});

const setQuizMode = (value) => {
  state.quizMode = value;
};

const toggleQuizMode = () => {
  state.quizMode = !state.quizMode;
};

export default { state: readonly(state), setQuizMode, toggleQuizMode };
