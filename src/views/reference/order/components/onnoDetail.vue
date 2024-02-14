<template>
  <!-- detailクラスはtypographyに記載 -->
  <div>
    <div class="reference_order__title">
      <h1 class="detail__title">
        {{ info ? info.stock : "" }}
        <template
          v-if="currentData && currentData.otc_consign_cls == '1'"
        >
        ({{
            currentData.stock_cd.toString()[
              currentData.stock_cd.toString().length - 1
            ] === "0"
              ? currentData.stock_cd.toString().slice(0, -1)
              : currentData.stock_cd
          }})
        </template>
        <template v-else>{{ info ? info.company : "-" }}</template>
      </h1>
      <div class="reference_order__title-buttons">       
        <a class="button button__main" style="cursor:pointer;"
            @click="
                    toStockDetail(                      
                      currentData.stock_cd,
                      currentData.exchange_cls,                      
                    )
                    "> 銘柄情報 </a>
      </div>
    </div>
    <div class="brand__tags">
      <p class="color_tag--main">{{ orderStatusDisplay }}</p>
      <p
        :class="
          currentData.buy_sell_cls == 1 ? 'color_tag--primary' : 'color_tag--secondary'
        "
      >
        {{ currentData.buy_sell_nm || "-" }}
      </p>
    </div>
    <p class="brand__tipinfo">
    <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
    <a :href="HELPD412" target="_blank"
        >ご注意事項<span>?</span></a
      >
    </p>
    <div class="reference_order__table card card--sphidden">
      <div class="table">
        <list-page :data="infors" />
        <div class="reference_order_tips" v-show="!newCanCancel && canCancel">
          注文取消<br />上記の注文を取消します。
        </div>
        <div class="reference_order__modal">
          <a v-if="!canCancel && !newCanCancel && (currentData.order_status == 1 || currentData.order_status == 3 || currentData.order_status == 5) && currentData.otc_consign_cls == 2"
             class="button button__primary button__medium ly_button"
             @click="openPopup"
            >注文訂正</a
          >
          <a v-if="!newCanCancel && canCancel"
             class="button button__white button__medium ly_button"
             @click="cancelOrder"
          >
            キャンセル
          </a>
          <a v-if="(!newCanCancel && (currentData.order_status == 1 || currentData.order_status == 3 || currentData.order_status == 5))"
              class="button button__primary button__medium ly_button"
              @click="eraseOrder"
            >注文取消</a
          >
        </div>
        <list-page :data="infors2" :failed="[3, 5].includes(currentData.ORDER_STATUS)"/>
      </div>
      <router-link to="/reference/order/jp" class="button button__white button__medium"
        >注文一覧へ</router-link
      >
    </div>
  </div>
</template>

<script>
import onnoDetail from "@/assets/js/page/reference/order/onnoDetail";
export default onnoDetail;
</script>
