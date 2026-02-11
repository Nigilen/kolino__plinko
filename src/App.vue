<script setup lang="ts">
import { ref } from 'vue';
import GameTitle from '@/components/GameTitle.vue';
import GameModal from '@/components/GameModal.vue';
import { data } from '@/data';
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
        :winValue="data.modal.bonus" 
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
  row-gap: min(100px, 12vmax);
}

</style>
