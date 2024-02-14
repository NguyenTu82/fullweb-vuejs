<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/settings" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>口座・設定</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link to="/settings/user/" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"
            ><strong>アカウント・設定変更</strong></a
          >
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link to="" v-slot="{ navigate }" custom>
          <a @click="navigate">取引暗証番号のロック解除申請</a>
        </router-link>
      </nav>
    </TopInfo>
    <section class="settings">
      <div v-if="!doneFlag" class="wrapper">
        <h1 class="title">取引暗証番号のロック解除申請</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="verification">
              <div class="planeIcon" style="text-align: center;">
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
                  @paste.prevent
                  placeholder="0"
                  pattern="[0-9]*"
                  v-model.trim="codeData[index]"
                  ref="input"
                  @input="
                    (e) => {
                      onInput(e, index);
                    }
                  "
                  @keydown.delete="
                    (e) => {
                      onKeydown(e.target.value, index);
                    }
                  "
                  @focus="onFocus"
                  :maxlength="1"
                  autocomplete="off"
                />
              </div>
              <button
                :disabled="!inputOver"
                :class="
                  inputOver
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
              <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
              <a
                :href="HELPMAIL"
                class="verification__link"
              >
                <img src="/assets/images/question.png" alt="?" />
                メールが届かない方はこちら
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="wrapper">
        <h1 class="title">取引暗証番号のロック解除申請</h1>
        <div class="container card">
          <div class="result">
            <h2>取引暗証番号のロックを解除しました</h2>
            <div class="result__image">
              <div class="result__image-status result__image-status--lock">
                <img
                  :class="['right', 'complete']"
                  src="/assets/images/right-green.svg"
                  alt="チェックアイコン"
                />
              </div>
              <img src="/assets/images/lock.svg" alt="アイコン" />
            </div>
            <a href="/home" class="button button__white button__full">
              ホームへ
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/settings/user/unlockTradePwd/unlockTradePwdCode.js"></script>
