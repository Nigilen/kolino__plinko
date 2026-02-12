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

</style>
