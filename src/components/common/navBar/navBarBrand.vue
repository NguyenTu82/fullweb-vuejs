<template>
  <div class="grid_buttons">
    <router-link
      v-for="item in value"
      :to="{ path: item.path }"
      :key="item.key"
      :class="[activeBtn(item.path, item.key)]"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>

<script src="@/assets/js/components/common/navBar/navBarBrand.js"></script>

<style scoped></style>
