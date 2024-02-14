<template>
  <main class="no_header_padding">
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>
    <div class="wrapper">
      <section class="open">
        <h1 class="title">パスワード再設定</h1>
        <div class="container card">
          <div class="sp_wrapper">
            <h2 class="open__title">パスワード再設定</h2>
            <div class="open__text">
              <p>
                ログインパスワードについては<br />
                ①8〜16文字の間で設定してください。<br />
                ②半角英字、半角数字、半角記号より2種類以上を組み合わせて設定してください。<br />
                ③使用可能な記号は以下の通りです。<br />
                ! # % ` ( ) , . / : ; &lt; = > ? @ [ ] ^ _ { } ~ |<br />
                ・ここで設定したパスワードは、口座開設以降のログイン時に使います。
              </p>
            </div>
            <div class="open__input">
              <div class="open__input-flex">
                <label for="">パスワード</label>
                <label for="switch" class="switch">
                  <input
                    type="checkbox"
                    id="switch"
                    @change="changeType(formData[0])"
                  />
                  <div class="switch__base"></div>
                  <div class="switch__circle"></div>
                </label>
              </div>
              <input
                :type="formData[0].type"
                v-model.trim="formData[0].value"
                autocomplete="off"
                placeholder="********"
              />
              <div class="SetPwd-erroeTips" v-if="formData[0].showMsg">
                {{ formData[0].msg }}
              </div>
            </div>
            <div class="open__input">
              <div class="open__input-flex">
                <label for="">パスワード確認用</label>
                <label for="switch2" class="switch">
                  <input
                    type="checkbox"
                    id="switch2"
                    @change="changeType(formData[1])"
                  />
                  <div class="switch__base"></div>
                  <div class="switch__circle"></div>
                </label>
              </div>
              <input
                :type="formData[1].type"
                @paste.prevent
                v-model.trim="formData[1].value"
                autocomplete="off"
                placeholder="********"
              />
              <div class="SetPwd-erroeTips" v-if="formData[1].showMsg">
                {{ formData[1].msg }}
              </div>
            </div>

            <button
              :disabled="!pwdTrue"
              :class="
                pwdTrue
                  ? 'button button__main button__full '
                  : 'button button__disabled button__full'
              "
              @click="jumpNext"
            >
              設定する
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script src="@/assets/js/page/resetLoginPassword/setPwd"></script>
