<template>
  <div class="StockTrendGraph fund-chart">
    <div class="header-chart">
      <div class="big-title">運用実績</div>
      <div class="pull-list">
        <div class="display option" id="div_option" data-tap-disabled="true">
          <span class="title-chart">期間</span>
          <select
            class="sel value"
            id="seloption"
            @change="updatePeriod($event)"
          >
            <option value="2" selected>３ヶ月</option>
            <option value="3">６ヶ月</option>
            <option value="4">１年</option>
            <option value="5">３年</option>
          </select>
          <img
            class="icon"
            alt="arrow-bottom"
            src="/assets/images/arrow-bottom.svg"
          />
        </div>
      </div>
    </div>
    <div class="chart" v-init-echart="chartObj">
      <div class="floating-tooltip-2"></div>
      <div class="price-label">
        <span class="price-label-text"></span>
      </div>
      <div class="price-label-right">
        <span class="price-label-text-right"></span>
      </div>
    </div>
    <div class="chart-label">
      <div class="label-price">基準価額</div>
      <div class="label-price-d">分配金込基準価額</div>
      <div class="label-price-capital">純資産</div>
    </div>
  </div>
</template>

<script src="@/assets/js/page/transaction/common/FundChart/index.js"></script>
<style lang="less" scoped></style>
