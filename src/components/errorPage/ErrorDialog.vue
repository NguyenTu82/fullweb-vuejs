<template>
  <div v-if="apiErrorMsgConfig.isShow">
    <div class="wrapper">
      <br />
      <br />
      <h1>{{ apiErrorMsgConfig.text }}</h1>
    </div>
  </div>
</template>

<script src="@/assets/js/components/errorPage/ErrorDialog.js"></script>
