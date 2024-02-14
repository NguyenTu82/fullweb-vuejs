<template>
  <main class="no_header_padding">
    <div class="wrapper">
      <section class="order">
        <div class="container card">
          <div class="tab_wrapper">
            <div class="result">
              <div class="result__image--top">
                <img
                  v-if="isShowCheer()"
                  src="/assets/images/logo.svg"
                  alt="アイコン"
                />
                <img v-else src="/assets/images/logo.png" alt="アイコン" />
              </div>
              <p class="result__text result__text--center">
                現在メンテナンス中です。<br />
                ご不便をおかけして申し訳ございません。
              </p>
              <p
                class="result__text result__text--center"
                v-if="maintenanceData.MESSAGE"
              >
                {{ maintenanceData.MESSAGE }}
              </p>
              <a
                :href="maintenanceData.MAINTENANCE_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="button button__main button__full"
              >
                詳細はこちら
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script src="@/assets/js/page/maintenance/index.js"></script>

<style scoped></style>
