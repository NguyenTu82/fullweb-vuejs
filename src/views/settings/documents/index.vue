<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/settings/"><strong>口座・設定</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/settings/documents/">取引説明書・約款閲覧</a>
      </nav>
    </TopInfo>
    <section class="settings">
      <div class="wrapper">
        <h1 class="title">取引説明書・約款閲覧</h1>
        <div class="container container--notop card">
          <div class="l_tab_wrapper">
            <div class="grid_list">
              <div
                class="card settings__menu"
                v-for="item in documentList"
                :key="item.SEQ_NO"
              >
                <div
                  class="settings__menu-title settings__menu-title--small documents"
                >
                  <h3>{{ item.DOCUMENT_NAME }}</h3>
                  <div class="list_card__title-infomation">
                    <span
                      :class="
                        item.READ_FLG == 1
                          ? 'color_tag--black'
                          : 'color_tag--main'
                      "
                    >
                      {{ item.READ_FLG == 1 ? "既読" : "未読" }}
                    </span>
                    <span
                      v-if="item.AGREEMENT_FLG == 1"
                      :class="
                        item.CONFIRM_FLG == 1
                          ? 'color_tag--black'
                          : 'color_tag--main'
                      "
                    >
                      {{ item.CONFIRM_FLG == 1 ? "同意済" : "未同意" }}
                    </span>
                  </div>
                </div>
                <div class="settings__menu-subtext">
                  <p>{{ handleDateTime(item.BASE_D).date }}</p>
                  <p>同意日 {{ handleDateTime(item.CONFIRM_DT).date }}</p>
                </div>
                <div class="settings__menu-box documents">
                  <a @click="handelReadPdf(item)" class="button button__main"
                    >PDF</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="settings__confirm">
            <a
              href="/settings/"
              class="button button__white button__full button__back"
              ><img src="/assets/images/arrow_back_g.png" alt="" />
              口座情報・設定画面へ</a
            >
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/settings/documents/index"></script>

<style scoped></style>
