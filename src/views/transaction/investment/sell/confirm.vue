<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link :to="{ name: 'Home' }" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>投資信託</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">
          <span>銘柄一覧</span>
        </a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">
          <span>解約</span>
        </a>
      </nav>
    </TopInfo>
    <section class="order">
      <div class="wrapper">
        <h1 class="title">[解約] 投資信託</h1>
        <div class="container card" v-if="datas">
          <div class="tab_wrapper order__wrapper">
            <p class="order__emphasis">
              ご注文内容をご確認の上、相違なければ注文ボタンをクリックしてください。
            </p>
            <h2 class="detail__title--sell">{{ datas.fund_abb_nm }}</h2>
            <div class="order__tags">
              <p class="tag" v-if="datas.fund_nickname">
                {{ datas.fund_nickname }}
              </p>
              <p class="tag" v-if="datas.fund_attr_cls != 1">
                {{ datas.fund_attr_cls_nm }}
              </p>
              <p
                class="tag"
                v-for="(item, index) in datas.fund_type_list"
                :key="index"
              >
                {{ item.fund_type_nm }}
              </p>
            </div>
            <div class="order__data card card--sphidden">
              <div class="table">
                <div class="table__box" v-if="datas.base_price_current_dt">
                  <div class="table__box-title">
                    <p>
                      参考基準価額{{ `（${datas.base_price_current_dt}）` }}
                    </p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ `${handNumberInt(datas.base_price)}`
                      }}<small>円</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>分配金受取方法</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ datas.order_dividend_handling_cls_nm }}</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>売買区分</p>
                  </div>
                  <div class="table__box-value">
                    <p>解約</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>{{ amount_cls == "3" ? "概算注文金額" : "注文金額" }}</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumberInt(datas.order_amount) }}<small>円</small>
                    </p>
                    <p>
                      <small>
                        (概算手数料（消費税込）:
                        {{ handNumberInt(datas.comm_fee) }}円)</small
                      >
                    </p>
                    <p><small> 信託財産保留額 </small></p>
                    <p>
                      <small> ※{{ datas.partial_redemption_charge }}</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>概算約定代金</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumberInt(datas.approximate_exec_amount)
                      }}<small>円</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>{{ amount_cls == "3" ? "解約口数" : "概算解約口数" }}</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumberInt(datas.approximate_exec_qty)
                      }}<small>口</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>概算約定金額</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumberInt(datas.approximate_value_amount)
                      }}<small>円</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>約定日</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ datas.trade_d }}</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>受渡日</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ datas.value_d }}</p>
                  </div>
                </div>
              </div>
              <div class="table__box">
                <div class="table__box-title">
                  <p>口座区分</p>
                </div>
                <div class="table__box-value">
                  <p>
                    {{ datas.account_cls_nm }}
                    {{ `(${datas.withholding_cls_nm})` }}
                  </p>
                </div>
              </div>
              <div class="order__modal">
                <button
                  @click="handleBackSellOrder()"
                  class="button button__white button__medium"
                >
                  入力画面へ戻る
                </button>
                <button
                  @click="handleInvSellOrderRegistrationController()"
                  class="button button__primary button__medium"
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
<script src="@/assets/js/page/transaction/investment/sell/confirm.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
