<template>
  <div class="tab_area">
    <a
      class="tab"
      :class="this.tab_data.tab1.is_active ? 'active' : ''"
      @click="route(tab_data.tab1.link)"
      >{{ tab_data.tab1.name }}</a
    >
    <a
      @click="route(tab_data.tab2.link)"
      class="tab"
      :class="this.tab_data.tab2.is_active ? 'active' : ''"
      >{{ tab_data.tab2.name }}</a
    >
  </div>
</template>

<script src="@/assets/js/components/common/HeaderTab.js"></script>
