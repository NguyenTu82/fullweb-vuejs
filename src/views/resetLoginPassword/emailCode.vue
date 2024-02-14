<template>
  <main class="no_header_padding">
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>
    <div class="wrapper">
      <section class="open">
        <h1 class="title">パスワード再設定</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="verification">
              <div class="email-icon">
                <img src="/assets/images/aircraft.svg" alt="" />
              </div>
              <h2>メールをご確認ください</h2>
              <p class="verification__text">
                ご登録のメールアドレスに「認証コード」をお送りしました。<br />
                メールに記載の「認証コード」を入力してください。
              </p>
              <p class="verification__text--error">
                <img src="/assets/images/exclamation.png" alt="!" />
                認証コードの有効期限は60分です
              </p>
              <div class="verification__code">
                <input
                  v-for="(c, index) in codeData"
                  :key="index"
                  type="text"
                  placeholder="0"
                  pattern="[0-9]*"
                  v-model.trim="codeData[index]"
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
                  :maxlength="1"
                />
              </div>
              <button
                :disabled="lock"
                :class="
                  !lock
                    ? 'button button__main button__full verification__button'
                    : 'button button__disabled button__full verification__button'
                "
                @click="handleSend"
              >
                認証する
              </button>
              <CountDown
                @getCode="this.getAgainCode"
                ref="countdownCom"
              ></CountDown>
              <a
                href="https://www.cheer-sec.co.jp/other/app-help/mail.html"
                class="verification__link"
              >
                <img src="/assets/images/question.png" alt="?" />
                メールが届かない方はこちら
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
<script src="@/assets/js/page/resetLoginPassword/emailCode"></script>
