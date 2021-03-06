import { reactive, readonly } from "vue";
import Colors from "@/utils/color";

const state = reactive({
  quizMode: false,
  borderColor: Colors.YELLOW,
});

const setQuizMode = (value) => {
  state.quizMode = value;
};

const toggleQuizMode = () => {
  state.quizMode = !state.quizMode;
};

const setBorderColor = (color) => {
  state.borderColor = color;
};

const resetBorderColor = () => {
  state.borderColor = Colors.YELLOW;
};

export default {
  state: readonly(state),
  setQuizMode,
  toggleQuizMode,
  setBorderColor,
  resetBorderColor,
};
