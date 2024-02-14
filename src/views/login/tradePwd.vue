<template>
  <main class="no_header_padding">
    <div class="wrapper">
      <section class="loginform">
        <h1 class="title">取引暗証番号の設定</h1>
        <form class="card" action="">
          <div class="sp_wrapper">
            <h2 class="loginform__title">取引暗証番号の入力</h2>
            <p class="loginform__about loginform__about--last">
              半角数字4桁の取引暗証番号を設定してください。取引暗証番号はログインパスワードとは異なり、売買や入出金などで使用します。
            </p>
            <div class="loginform__item">
              <div class="loginform__item-upper">
                <div class="loginform__item-label">
                  <label for="transaction">{{ formdata[0].title }}</label>
                  <label for="switch1" class="switch">
                    <input
                      type="checkbox"
                      id="switch1"
                      v-model="formdata[0].showPassword"
                      true-value="1"
                      false-value="0"
                    />
                    <div class="switch__base"></div>
                    <div class="switch__circle"></div>
                  </label>
                </div>
              </div>
              <div class="loginform__item-lower">
                <input
                  :type="formdata[0].showPassword == 1 ? 'text' : 'password'"
                  autocomplete="off"
                  v-model="formdata[0].value"
                  placeholder="****"
                  :change="inputLoginId1()"
                />
              </div>
              <div class="error-tip" v-if="formdata[0].showmsg">
                {{ formdata[0].msg }}
              </div>
            </div>
            <div class="loginform__item">
              <div class="loginform__item-upper">
                <div class="loginform__item-label">
                  <label for="transactionConfirm">{{
                    formdata[1].title
                  }}</label>
                  <label for="switch2" class="switch">
                    <input
                      type="checkbox"
                      id="switch2"
                      v-model="formdata[1].showPassword"
                      true-value="1"
                      false-value="0"
                    />
                    <div class="switch__base"></div>
                    <div class="switch__circle"></div>
                  </label>
                </div>
              </div>
              <div class="loginform__item-lower">
                <input
                  :type="formdata[1].showPassword == 1 ? 'text' : 'password'"
                  autocomplete="off"
                  v-model="formdata[1].value"
                  placeholder="****"
                  :change="inputLoginId2()"
                />
              </div>
              <div class="error-tip" v-if="formdata[1].showmsg">
                {{ formdata[1].msg }}
              </div>
            </div>
            <button
              :class="
                isOver
                  ? 'button button__main button__full'
                  : 'button button__disabled button__full'
              "
              :disabled="!isOver"
              v-on:click.prevent="jumpNext"
            >
              設定する
            </button>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>
<script src="@/assets/js/page/login/tradePwd"></script>
