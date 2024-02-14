<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>

    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/reference/condition/"><strong>資産・照会</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/condition/"><strong>資産状況</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/trend">余力管理</a>
      </nav>
    </TopInfo>

    <section class="property">
      <div class="wrapper">
        <div class="grid_buttons">
          <router-link
            to="/reference/condition"
            class="button__square--selected"
            >資産状況
          </router-link>
          <router-link to="/reference/order/jp" class="button__square"
            >注文一覧
          </router-link>
          <router-link to="/reference/contract/jp" class="button__square"
            >約定一覧
          </router-link>
          <router-link to="/reference/deposit" class="button__square"
            >預り金増減
          </router-link>
        </div>
        <h1 class="title">余力管理</h1>
        <div class="card container">
          <div class="tab_wrapper">
            <div class="property__trend">
              <h2>詳細</h2>
            </div>
            <div class="property__detail card card--sphidden">
              <div class="property__detail-title">
                <h2>{{ detailData.base_d }}（{{ week }}）</h2>
                <h2>{{ days }}</h2>
              </div>
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>買付余力</p>
                  </div>
                  <div class="table__box-value table__box-value--result">
                    <div class="table__box-value--wrap">
                      <div class="table__box-value--text">
                        {{
                          common.handNumberInt(
                            detailData.buy_available_capacity
                          ) || 0
                        }}<small>円</small>
                      </div>
                      <div class="table__box-value--color_title">内訳</div>
                      <div class="table__box-value--flex_wrap">
                        <div
                          class="
                            table__box-value--text
                            table__box-value--title
                            table__box-value--item
                          "
                        >
                          預り金
                        </div>
                        <div
                          class="table__box-value--text table__box-value--item"
                        >
                          {{ common.handNumberInt(detailData.cash_balance) || 0
                          }}<small>円</small>
                        </div>
                      </div>
                      <div class="table__box-value--flex_wrap">
                        <div
                          class="
                            table__box-value--text
                            table__box-value--title
                            table__box-value--item
                          "
                        >
                          即金規制拘束額
                        </div>
                        <div
                          class="table__box-value--text table__box-value--item"
                        >
                          {{
                            common.handNumberInt(
                              detailData.stock_sameday_deposit
                            ) || 0
                          }}<small>円</small>
                        </div>
                      </div>
                      <div class="table__box-value--flex_wrap">
                        <div
                          class="
                            table__box-value--text
                            table__box-value--title
                            table__box-value--item
                          "
                        >
                          日計り売買拘束額
                        </div>
                        <div
                          class="table__box-value--text table__box-value--item"
                        >
                          {{
                            common.handNumberInt(
                              detailData.stock_daily_restraint
                            ) || 0
                          }}<small>円</small>
                        </div>
                      </div>
                      <div class="table__box-value--flex_wrap">
                        <div
                          class="
                            table__box-value--text
                            table__box-value--title
                            table__box-value--item
                          "
                        >
                          注文中拘束額
                        </div>
                        <div
                          class="table__box-value--text table__box-value--item"
                        >
                          {{
                            common.handNumberInt(
                              detailData.stock_and_invest_ordering
                            ) || 0
                          }}<small>円</small>
                        </div>
                      </div>
                      <div class="table__box-value--flex_wrap">
                        <div
                          class="
                            table__box-value--text
                            table__box-value--title
                            table__box-value--item
                          "
                        >
                          譲渡益税拘束額
                        </div>
                        <div
                          class="table__box-value--text table__box-value--item"
                        >
                          {{
                            common.handNumberInt(
                              detailData.transfer_return_plan_amt
                            ) || 0
                          }}<small>円</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>出金余力</p>
                  </div>
                  <div class="table__box-value table__box-value--result">
                    <p>
                      {{
                        common.handNumberInt(
                          detailData.withdrawal_available_capacity
                        ) || 0
                      }}<small>円</small>
                    </p>
                  </div>
                </div>
              </div>
              <div class="property__back">
                <router-link
                  to="/reference/trend"
                  class="button button__white button__medium"
                  >余力推移一覧へ
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import trendDetail from "@/assets/js/page/reference/condition/trendDetail";

export default trendDetail;
</script>
