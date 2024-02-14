<template>
  <div class="tabs two_columns--small brand__tab">
    <button
      :disabled="disabled"
      type="button"
      :class="[
        item.key == kind
          ? 'tabs__item--selected'
          : disabled
          ? 'tabs__item--disabled'
          : 'tabs__item',
      ]"
      v-for="item in titles"
      :key="item.key"
      @click="$emit('changeKind', item.key)"
    >
      {{ item.value }}
    </button>
  </div>
</template>

<script src="@/assets/js/components/common/navBar/NavOrder.js"></script>

<style lang=""></style>
