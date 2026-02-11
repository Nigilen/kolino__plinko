<script lang="ts" setup>
import { data } from '@/data';

const props = defineProps<{
  winValue: number | string;
}>();

const emits = defineEmits<{
  (e: 'modalClose'): void;
}>();

const handleModalClose = () => {
  emits('modalClose');
};

</script>

<template>

  <section class="modal">
    <div class="modal__content">
      <h2 class="modal__title">{{ data.modal.title }}</h2>
      <p class="modal__bonuse">{{ props.winValue }}</p>
      <button class="modal__button" type="button" @click="handleModalClose">{{ data.modal.button }}</button>
    </div>
  </section>

</template>

<style lang="css" scoped>

.modal {
  position: fixed;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  container-type: inline-size;
}
.modal__content {
  background-color: #f3f3f3;
  padding: 3cqmin;
  border-radius: 2cqi;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1cqb;
  border: min(2px, 0.6cqi) solid #333;
  inline-size: min(340px, 90vmin);
  block-size: auto;
  aspect-ratio: 1.5 / 1;
}
.modal__title {
  font-size: min(40px, 12cqmin);
  line-height: 0;
}
.modal__bonuse {
  font-size: min(50px, 15cqmin);
  line-height: 0;
}
.modal__button {
  font-size: min(18px, 6cqmin);
  background-color: var(--accent-color);
  padding: min(10px, 1cqb) min(30px, 7cqi);
  border-radius: 0.5cqmin;
  color: var(--secondary-color);
  border: min(2px, 0.6cqi) solid #333;
  transition-duration: .3s;

  &:hover {
    transform: scale(1.1);
  }
}

.v-enter-active, .v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

.v-enter-active .modal__content, .v-leave-active .modal__content {
  transition: transform 0.5s cubic-bezier(.82,.12,.39,2.75);
}

.v-enter-from .modal__content, .v-leave-to .modal__content {
  transform: scale(0);
}

</style>