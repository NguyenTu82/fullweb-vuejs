<template>
  <main>
    <TopInfoItem :breadName="breadName"></TopInfoItem>
    <section class="payment payment-deposit">
      <div class="wrapper">
        <TabContent></TabContent>
        <h1 class="title">
          {{ depositCurrentTab == 1 ? "リアルタイム入金" : "振込入金" }}
        </h1>
        <div class="container card">
          <TabItem />
          <TabRealTimeCashIn
            v-show="depositCurrentTab == 1"
            ref="realtime"
            :errors="errors"
          />
          <TabTransferCashIn v-show="depositCurrentTab == 2" />
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/payment/deposit/index"></script>

<style></style>
