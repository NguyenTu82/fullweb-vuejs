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
        <a href="/account/"><strong>口座情報</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">出金先金融機関の変更</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <h1 class="title">出金先金融機関の変更</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="verification">
              <div class="planeIcon">
                <img src="/assets/images/aircraft.svg" alt />
              </div>
              <h2>メールをご確認ください</h2>
              <!-- <p class="verification__email">{{ mail }}</p> -->
              <p class="verification__text">
                ご登録のメールアドレスに「認証コード」をお送りしました。<br />メールに記載の「認証コード」を入力してください。
              </p>
              <p class="verification__text--error">
                <img src="/assets/images/exclamation.png" alt="!" />
                認証コードの有効期限は60分です
              </p>
              <div class="verification__code">
                <template v-for="(c, index) in ct" :key="index">
                  <input
                    type="text"
                    min="0"
                    :maxlength="1"
                    pattern="[0-9]*"
                    v-model.trim="ct[index]"
                    ref="input"
                    @input="
                      (e) => {
                        onInput(e.target.value, index);
                      }
                    "
                    @keydown.delete="
                      (e) => {
                        onKeydown(e.target.value, index);
                      }
                    "
                    @focus="onFocus"
                    placeholder="0"
                    onkeyup="value=value.replace(/[^a-z0-9_]/g,'');"
                    onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                    oninput="if(value.length>1)value=value.slice(0,1)"
                  />
                </template>
              </div>
              <div class="settings__confirm">
                <a
                  href="javascript:;"
                  @click="$router.back()"
                  class="button button__white button__medium"
                  >戻る</a
                >
                <a
                  href="javascript:;"
                  :class="[
                    { disable: !lock },
                    'button button__main button__medium',
                  ]"
                  @click="change"
                  >認証する</a
                >
              </div>
              <p class="verification__link" @click="again">
                <img
                  src="/assets/images/question.png"
                  alt="?"
                />もう一度認証コードメールを送信する
              </p>

              <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
              <a
                :href="HELPMAIL"
                class="verification__link"
                target="_blank"
              >
                <img src="/assets/images/question.png" alt="?" />
                メールが届かない方はこちら
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Message v-if="messageDialog" @determine="determine" :text="text"></Message>
</template>

<script>
import confirm2 from "@/assets/js/page/settings/account/confirm2";
export default confirm2;
</script>

<style></style>
