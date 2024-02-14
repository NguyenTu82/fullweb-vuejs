/* * @Author: HaiLQ * @Last Modified by: HaiLQ * @Last Modified time: 2022-06-15
* @ID Function: C611-1 * @Description: 購入内容の確認画面 */

<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/home/"><strong>投資信託</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a><strong>銘柄一覧</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a>購入</a>
      </nav>
    </TopInfo>
    <section class="order">
      <div class="wrapper">
        <h1 class="title">[購入] 投資信託</h1>
        <div class="container card">
          <div class="tab_wrapper order__wrapper">
            <p class="order__emphasis">
              ご注文内容をご確認の上、相違なければ注文ボタンをクリックしてください。
            </p>
            <h2 class="detail__title--buy">{{ datas.fund_nm_short }}{{ datas.fund_nickname ? "(" + datas.fund_nickname + ")" : "" }}</h2>
            <div class="order__tags">
              <p
                class="tag"
                v-for="(label, index) in datas.brandLabels"
                :key="index"
              >
                {{ label.name }}
              </p>
            </div>
            <div class="order__data card card--sphidden" v-if="datas">
              <div class="table">
                <div
                  class="table__box"
                  v-for="(item, index) in datas.infoArr"
                  :key="index"
                >
                  <div class="table__box-title">
                    <p>{{ item.title }}</p>
                  </div>
                  <div class="table__box-value">
                    <p v-html="item.value"></p>
                  </div>
                </div>
              </div>

              <div class="order__modal">
                <a
                  class="button button__white button__medium"
                  @click="handleBackBuyOrder()"
                  >入力画面へ戻る</a
                >
                <button
                  @click="handleConfirmBuyOrder()"
                  class="button button__secondary button__medium"
                >
                  注文申し込み
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script src="@/assets/js/page/transaction/investment/buy/confirm.js"></script>

<style scoped lang="scss"></style>
