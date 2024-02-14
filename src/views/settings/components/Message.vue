<template>
  <section class="message">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2>{{ text }}</h2>
        <div class="modal__buttons">
          <a
            href="javascript:;"
            class="button button__white button__medium"
            @click="confirm"
          >
            確定
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import message from "@/assets/js/page/settings/components/message";
export default message;
</script>

<style></style>
