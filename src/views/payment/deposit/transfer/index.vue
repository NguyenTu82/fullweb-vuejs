/* * @Author: VuPV * @Last Modified by: VuPV * @Last Modified time: 2022-06-09 *
@ID Function: E110-2 * @Description: リアルタイム入金 */

<template>
  <main>
    <TopInfoItem></TopInfoItem>
    <section class="payment">
      <div class="wrapper">
        <TabContent></TabContent>
        <h1 class="title">リアルタイム入金</h1>
        <div class="container card">
          <TabItem></TabItem>
          <div class="tab_wrapper">
            <div class="payment__spacer"></div>
            <div class="payment__spacer"></div>
            <div class="table payment__table card card--sphidden">
              <p class="payment__table-infomation--top">お振込による入金</p>
              <p class="payment__table-infomation--sub">
                下記のお客さま専用の口座にお振り込みください。
              </p>
              <div class="table__box">
                <div class="table__box-title">
                  <p>金融機関名</p>
                </div>
                <div class="table__box-value table__box-value--result">
                  <p>〇〇銀行</p>
                </div>
              </div>
              <div class="table__box">
                <div class="table__box-title">
                  <p>金融機関コード</p>
                </div>
                <div class="table__box-value table__box-value--result">
                  <p>0001</p>
                </div>
              </div>
              <div class="table__box">
                <div class="table__box-title">
                  <p>本支店名</p>
                </div>
                <div class="table__box-value table__box-value--result">
                  <p>十五号支店</p>
                </div>
              </div>
              <div class="table__box">
                <div class="table__box-title">
                  <p>支店コード</p>
                </div>
                <div class="table__box-value table__box-value--result">
                  <p>153</p>
                </div>
              </div>
              <div class="table__box">
                <div class="table__box-title">
                  <p>預金種目</p>
                </div>
                <div class="table__box-value table__box-value--result">
                  <p>普通</p>
                </div>
              </div>
              <div class="table__box">
                <div class="table__box-title">
                  <p>口座番号</p>
                </div>
                <div class="table__box-value table__box-value--result">
                  <p>1070047</p>
                </div>
              </div>
              <div class="table__box">
                <div class="table__box-title">
                  <p>口座名義人</p>
                </div>
                <div class="table__box-value table__box-value--result">
                  <p>チアショウケンカブシキガイシャ</p>
                </div>
              </div>
            </div>
            <p class="payment__text--caution payment__spacer">
              ご入金元の金融機関口座は、必ずご本人名義の金融機関口座をご利用ください。<br />
              他人名義の金融機関口座（ご家族名義の口座を含みます）からお振込があった場合は、ご入金が反映されませんのでご注意ください。
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/payment/deposit/transfer/index"></script>

<style scoped></style>
