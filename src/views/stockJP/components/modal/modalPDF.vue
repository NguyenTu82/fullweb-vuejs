<template>
  <section v-show="isShow" class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <p class="modal__text">
          お取引いただく前に、以下の書面をご確認ください。
        </p>
        <div class="modal__pdfs">
          <div
            :key="value.id"
            v-for="value in dataPDF"
            class="modal__pdfs-item"
          >
            <a
              @click="funcReadPDF(value.SEQ_NO, value.READ_FLG)"
              target="_blank"
              :href="value.DOCUMENT_PDF_PATH"
            >
              <img
                class="icon_pdf"
                :src="
                  arrPDF.includes(value.SEQ_NO)
                    ? '/assets/images/icon_pdf_read.png'
                    : '/assets/images/icon_pdf.png'
                "
              />
            </a>
            <a
              @click="funcReadPDF(value.SEQ_NO, value.READ_FLG)"
              target="_blank"
              :href="value.DOCUMENT_PDF_PATH"
            >
              <p>{{ value.DOCUMENT_NAME }}</p></a
            >
          </div>
        </div>
        <p class="modal__text">書面をよく読み、十分に理解しました。</p>
        <div class="modal__buttons">
          <button
            @click="actionCancel"
            type="button"
            class="button button__white button__medium"
          >
            キャンセル
          </button>
          <button
            :disabled="arrPDF.length != dataPDF.length"
            @click="actionConfirm"
            type="button"
            :class="
              arrPDF.length == dataPDF.length
                ? 'button button__main button__medium'
                : 'button button__disabled button__medium'
            "
          >
            同意する
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/stockJP/components/modal/modalPDF.js"></script>
