<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>

    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/settings/"><strong>口座・設定</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">口座情報</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="settings__table card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>現在の商品等に関する広告メール</p>
                  </div>
                  <div class="table__box-value">
                    <div class="settings__table-value">
                      <p>受け取る</p>
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>新しい商品等に関する広告メール</p>
                  </div>
                  <div class="table__box-value">
                    <p class="settings__table-text--nospace">
                      当社からの商品等に関する広告メールを受け取りますか。
                    </p>
                    <p class="settings__table-text">
                      ※手続・取引関連の重要なメールは、本設定に関わらずお送りいたします
                    </p>
                    <div class="settings__table-input-buttons">
                      <button class="button__square--selected">受け取る</button>
                      <button class="button__square">受け取らない</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="settings__confirm">
                <a
                  href="/account/"
                  class="button button__white button__medium"
                  >キャンセル</a
                >
                <a
                  href="/confirm/"
                  class="button button__main button__medium"
                  >変更する</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="modal">
      <div class="tab_wrapper">
        <div class="modal__content card">
          <h2>入力された内容で変更しますか。</h2>
          <p class="modal__text">暗証番号をご入力ください</p>
          <div class="modal__password">
            <input
              type="password"
              name="password"
              placeholder="****"
              maxlength="4"
            />
          </div>
          <div class="modal__buttons">
            <a
              href="javascript:;"
              @click="$router.back()"
              class="button button__white button__medium"
            >
              キャンセル
            </a>
            <a
              href="/done/"
              class="button button__main button__medium"
            >
              変更する
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import confirm from "@/assets/js/page/settings/account/confirm";
export default confirm;
</script>

<style></style>
