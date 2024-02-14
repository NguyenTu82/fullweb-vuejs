/* * @Author: VuPV * @Last Modified by: VuPV * @Last Modified time: 2022-06-09 *
@ID Function: E110-13 * @Description: リアルタイム入金 */

<template>
  <main>
    <TopInfoItem></TopInfoItem>
    <section class="payment">
      <div class="wrapper">
        <h1 class="title">ネット口座振替サービス</h1>
        <div class="container card">
          <div class="tab_wrapper">
            <h2 class="payment__title">ネット口座振替サービス登録画面</h2>
            <div class="payment__spacer"></div>
            <div class="payment__agreement card card--sphidden">
              <h3>口座情報確認</h3>
              <p class="payment__spacer">
                下記の口座情報をご確認いただき、よろしければ「
                三菱UFJ銀行
                サイトヘ」ボタンから、金融機関のお申込画面へお進みください。
              </p>
              <div class="payment__spacer"></div>
              <div class="payment__spacer"></div>
              <ListInCard :listInCard="listInCard"></ListInCard>
              <div class="payment__spacer"></div>
              <p class="payment__spacer">
                ※振込元銀行口座は当社の証券口座名義と同一のものに限ります。
              </p>
              <div class="payment__spacer"></div>
              <p class="payment__spacer">
                これより先は
                三菱UFJ銀行
                サイトへ遷移します。登録完了後「口座振替申込」ボタンを押下してCHEER証券取引サイトへ戻ります。
              </p>
              <div class="payment__spacer"></div>
              <p class="payment__agreement-error payment__spacer">
                <img src="/assets/images/exclamation.png" alt="!" />
                端末のブラウザの戻るボタンは使用しないでください。
              </p>
              <button
                @click="execute()"
                rel="noopener noreferrer"
                class="button button__full button__primary"
                v-show="!executeRealtimeContractFlag"
              >
                三菱UFJ銀行サイトへ
              </button>
            </div>
            <div class="payment__two_column_button">
              <button
                @click="handleBack"
                class="button button__white button__medium"
              >
                戻る
              </button>
              <button
                @click="handelSure"
                class="button button__white button__medium"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
      <form
        :action="actionUrl"
        method="post"
        id="kfform"
        accept-charset="Shift_JIS"
        target="_blank"
      >
        <input type="hidden" name="kfrequest" :value="kfrRequest" />
      </form>
    </section>
  </main>
</template>

<script src="@/assets/js/page/payment/deposit/pages/realtime-13"></script>

<style scoped></style>
