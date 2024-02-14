<template>
  <div>
    <div class="modal_bg" :class="showDialog ? 'show' : ''"></div>
    <div class="modal" :class="showDialog ? 'show' : ''">
      <div class="modal_title mb_medium" v-if="dialog.title">
        {{ dialog.title }}
      </div>
      <div class="modal_text mb_medium" v-html="dialog.message"></div>
      <button
        v-if="dialog.button.link"
        @click="
          $router.push({
            name: dialog.button.link,
            params: { component_param: dialog.button.params },
          })
        "
        class="btn primary"
      >
        {{ dialog.button.value }}
      </button>
      <button v-else class="btn primary" @click="closeDialog">
        {{ dialog.button.value }}
      </button>
    </div>
  </div>
</template>

<script src="@/assets/js/components/common/dialog/Dialog.js"></script>
