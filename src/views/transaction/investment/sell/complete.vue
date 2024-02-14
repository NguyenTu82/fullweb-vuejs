/* * @Author: HaiLQ * @Last Modified by: HaiLQ * @Last Modified time: 2022-06-15
* @ID Function: C611-2 * @Description: 購入内容の完了画面 */

<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/home/"><strong>投資信託</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">
          <span>銘柄一覧</span>
        </a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a>解約</a>
      </nav>
    </TopInfo>
    <section class="order">
      <div class="wrapper">
        <h1 class="title">[解約] 投資信託</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <h2 class="detail__title--sell">{{ orderName }}</h2>
          </div>
          <div class="result result--trade">
            <div v-show="getConfirmCanelBuySuccess()">
              <h2>注文取消</h2>
              <h2>注文取消を受け付けました</h2>
            </div>
            <div v-show="!getConfirmCanelBuySuccess()">
              <h2>解約を受け付けました</h2>
            </div>
            <button
              @click="handleBackList()"
              class="button button__main button__full"
            >
              注文一覧へ
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script src="@/assets/js/page/transaction/investment/sell/complete.js"></script>

<style scoped lang="scss"></style>
