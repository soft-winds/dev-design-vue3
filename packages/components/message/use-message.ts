import { ref } from "vue";
import type { MessageContextProps } from "./types";

const msgList = ref<MessageContextProps[]>([]);
const useIndex = () => {
  const msgIndex = ref(1000);
  return {
    current: msgIndex.value,
    nextZIndex: () => {
      msgIndex.value++;
      return msgIndex.value;
    },
  };
};
export const message = () => {
  const { nextZIndex } = useIndex();
  return {
    info: (message: string) => {},
    success: (message: string) => {},
    error: (message: string) => {},
    warning: (message: string) => {},
    destroy: () => {},
  };
};
