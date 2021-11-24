import { onMounted, onUnmounted, ref } from 'vue';

const useMouse = () => {
  const x = ref(0);
  const y = ref(0);

  const onMove = (e: MouseEvent) => {
    x.value = e.clientX;
    y.value = e.clientY;
  };
  onMounted(() => {
    document.addEventListener('mousemove', onMove);
  });

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMove);
  });

  return {
    x,
    y,
  };
};

export default useMouse;
