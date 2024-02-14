<!-- TODO: Revert-to-build-lib -->
<template>
  <appLayout>
    <popupNetwork :isShow="!onLine" @retry="retry" />
    <router-view />
  </appLayout>
</template>

<script src="@/assets/js/App.js"></script>
