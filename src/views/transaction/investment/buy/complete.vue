/* * @Author: HaiLQ * @Last Modified by: HaiLQ * @Last Modified time: 2022-06-15
* @ID Function: C611-2 * @Description: 購入内容の完了画面 */

<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb" v-if="status == 1">
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
      <nav class="topinfo__breadcrumb" v-else>
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/home/"><strong>資産・照会</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a><strong>注文一覧</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a><strong>投資信託</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a>{{ orderName }}</a>
      </nav>
    </TopInfo>
    <section class="order">
      <div class="wrapper">
        <h1 class="title">[購入] 投資信託</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <h2 class="detail__title--buy">{{ orderName }}</h2>
            <div class="brand__tags custom">
              <p
                class="tag"
                v-for="(label, index) in lists"
                :key="index"
              >
                {{ label.name }}
              </p>
            </div>
          </div>
          <div class="result result--trade">
            <h2 v-if="status == 2">注文取消</h2>
            <br/>
            <h2>
              {{
                status == 1
                  ? "注文を受け付けました"
                  : "取消注文を受け付けました"
              }}
            </h2>
            <!-- <div class="result__image"> -->
            <!-- <div class="result__image-status"> -->
            <!-- <img src="/assets/images/check.png" alt="" /> -->
            <!-- </div> -->
            <!-- <img src="/assets/images/phone.png" alt="" /> -->
            <!-- </div> -->
            <a
              @click="handleBackList()"
              class="button button__main button__full"
            >
              注文一覧へ
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/transaction/investment/buy/complete.js"></script>
<style scoped lang="scss"></style>
