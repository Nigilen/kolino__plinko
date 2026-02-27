<script setup lang="ts">
import { ref, type Ref } from 'vue';
import GameTitle from '@/components/GameTitle.vue';
import GameModal from '@/components/GameModal.vue';
import GamePlinko from '@/components/GamePlinko/GamePlinko.vue';

const gameRef = ref<InstanceType<typeof GamePlinko> | null>(null);

const isOpenModal = ref(false);
const isPlay = ref(false);
const winValue: Ref<number | string> = ref(0);

const handlePlay = () => {
  if (!gameRef.value) return;
  isPlay.value = true;
  gameRef.value.runBall();
};

const handleFinishGame = (text: string) => {
  winValue.value = text;
  handleOpenModal();
};

const handleOpenModal = () => {
  isOpenModal.value = true;
};

const handleCloseModal = () => {
  if (!gameRef.value) return;
  isPlay.value = false;
  gameRef.value.restartGame();
};

</script>

<template>
  <main class="main">
    <GameTitle />
    <GamePlinko ref="gameRef" @ballDropped="(text: string) => handleFinishGame(text)" />
    <button :disabled="isPlay" class="button" type="button" @click="handlePlay">Play</button>
  </main>
  <Teleport to="body">
    <Transition>
      <GameModal 
        v-model="isOpenModal"
        :winValue="winValue" 
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
  row-gap: min(30px, 10vmax);
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
    transform: scale(0.9);
    cursor: not-allowed;
  }
}

</style>
