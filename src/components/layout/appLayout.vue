<template>
  <div id="loading"></div>
  <component :is="layout">
    <slot />
  </component>
</template>

<script src="@/assets/js/components/layout/appLayout.js"></script>
