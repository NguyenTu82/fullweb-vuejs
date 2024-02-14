<template>
  <section class="modal" v-show="show" @touchmove.prevent>
    <div class="tab_wrapper">
      <div class="modal__content card">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/components/common/dialog/Caution.js"></script>

<style scoped></style>
