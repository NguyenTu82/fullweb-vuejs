<template>
  <div class="base_color_table">
    <div class="base_color_table__head four_columns">
      <p></p>
      <p><strong>売上高</strong></p>
      <p><strong>営業利益</strong></p>
      <p><strong>純利益</strong></p>
    </div>
    <div
      class="base_color_table__value four_columns"
      v-for="(item, index) in listResultInfo"
      :key="index"
    >
      <p>
        <small>{{ formatDate(item["base_d"]) ?? "-" }}</small>
      </p>
      <p>{{ this.handNumberInt(item["amt_of_sales"]) ?? "-" }}</p>
      <p>{{ this.handNumberInt(item["oeprating_income"]) ?? "-" }}</p>
      <p>{{ this.handNumberInt(item["net_income"]) ?? "-" }}</p>
    </div>
  </div>
</template>

<script src="@/assets/js/page/transaction/jp/brand/components/columnChartInfo"></script>

<style scoped></style>
