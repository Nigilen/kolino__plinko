<script setup lang="ts">
import { ref } from 'vue';
import GameTitle from '@/components/GameTitle.vue';
import GameModal from '@/components/GameModal.vue';
import { mainConfig } from '@/config/mainConfig';
import GamePlinko from '@/components/GamePlinko/GamePlinko.vue';

const isOpenModal = ref(false);
const isSpin = ref(false);
const winValue = ref();

const handleSpinStart = () => {
  isSpin.value = true;
};

const handleOpenModal = (winSector: number) => {
  isOpenModal.value = true;
};

const handleCloseModal = () => {
  isOpenModal.value = false;
  isSpin.value = false;
};

</script>

<template>
  <main class="main">
    <GameTitle />
    <GamePlinko />
    <button class="button" type="button">Play</button>
  </main>
  <Teleport to="body">
    <Transition>
      <GameModal 
        v-if="isOpenModal" 
        :winValue="mainConfig.modal.bonus" 
        @modalClose="handleCloseModal" 
      />
    </Transition>
  </Teleport>
</template>

<style lang="css" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: min(50px, 12vmax);
  block-size: 100%;
}

.button {
  background-color: var(--accent-color);
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--secondary-color);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 2px solid var(--primary-color);
  }
  &:disabled {
    background-color: var(--primary-color);
  }
}

</style>
