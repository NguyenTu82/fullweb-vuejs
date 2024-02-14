<template>
  <a href="" class="verification__link" @click.prevent="getAgainCode">
    <img
      :src="
        showtimer
          ? '/assets/images/question_black.png'
          : '/assets/images/question.png'
      "
      alt="?"
    />
    <div :class="showtimer ? 'showtimerGray' : ''">
      もう一度認証コードメールを送信する
      <span v-if="showtimer">({{ timercount }}s)</span>
    </div>
  </a>
</template>

<script src="@/assets/js/components/button/countDown.js"></script>

<style scoped></style>
