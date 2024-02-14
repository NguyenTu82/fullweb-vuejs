<template>
  <!-- detailクラスはtypographyに記載 -->
  <div class="reference_order__title">
    <h1 class="detail__title">
      {{ info ? info.stock : "" }}
      <template v-if="titleData ? titleData.otc_consign_cls == '1' : false">
        ({{
          titleData.stock_cd.toString()[
            titleData.stock_cd.toString().length - 1
          ] === "0"
            ? titleData.stock_cd.toString().slice(0, -1)
            : titleData.stock_cd
        }})
      </template>
      <template v-else>{{ info ? info.company : "-" }}</template>
    </h1>
    <div class="reference_order__title-buttons">
      <a class="button button__main" style="cursor:pointer;"
          @click="
                    toStockDetail(                      
                      titleData.stock_cd,
                      titleData.exchange_cls,                  
                    )
                    "> 銘柄情報 </a>
    </div>
  </div>
  <div class="detail__infomation">
    <p class="color_tag--main">{{ orderStatusDisplay }}</p>
    <p :class="titleData.buy_sell_cls == 1 ? 'color_tag--primary' : 'color_tag--secondary'">
      {{ titleData.buy_sell_nm || "-" }}
    </p>
  </div>
  <p class="detail__number">
    注文番号 <small>{{ titleData.ord_no ? titleData.ord_no : "-" }}</small>
  </p>
  <p class="brand__tipinfo">
    <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
    <a :href="HELPD412" target="_blank"
    >ご注意事項<span>?</span></a
    >
  </p>
  <div class="reference_order__history">
    <div class="base_color_table card">
      <div class="base_color_table__head four_columns">
        <p><strong>日時</strong></p>
        <p><strong>状況</strong></p>
        <p><strong>数量</strong></p>
        <p v-if="titleData.otc_consign_cls == 1">
          <strong
            >注文金額
            <br />
            /約定価格</strong
          >
        </p>
        <p v-if="titleData.otc_consign_cls == 2">
          <strong>価格</strong>
        </p>
      </div>
      <div
        class="base_color_table__value four_columns cell_large"
        v-for="(item, index) in listData"
        :key="index"
      >
        <p class="base_color_table__value-date--large">
          <template v-if="titleData.failure_dt">
            {{ commonJs.handleDate(titleData.failure_dt).date }}
          </template>
          <template v-else>
            &nbsp;&nbsp;{{ item.ord_dt ? commonJs.handleDate(item.ord_dt).date : '' }}
          </template>
          <span>{{ handelDate(item.ord_dt) }}</span>
        </p>
        <p>{{ handleStatusOrder(item) }}</p>
        <p>
          {{
            commonJs.handNumberInt(item.ord_qty) == 0 || item.ord_qty == null
              ? "ー"
              : commonJs.handNumberInt(item.ord_qty) + "株（口）"
          }}
        </p>
        <p v-if="item.price_cls_nm == '成行' && item.ord_sts == '約定'">
          {{
            `${item.price_cls_nm} / ${commonJs.handNumFloat(item.ord_price)} 円`
          }}
        </p>
        <template v-else>
          <p v-if="item.otc_consign_cls == 2">
            {{ item.price_cls_nm }}
            <template v-if="item.price_cls == 2">
              / {{ commonJs.handNumFloat(item.ord_price) }} <small>円</small>
            </template>
          </p>
        </template>
        <p v-if="item.otc_consign_cls == 1">
          <template v-if="item.ord_qty">
            {{
              handleNumberIsZero(
                commonJs.handNumberInt(
                  (item.ord_qty * item.ord_price).toFixed()
                )
              )
            }}
          </template>
          <template v-if="!item.ord_qty && item.ord_price">
            {{
              handleNumberIsZero(
                commonJs.handNumberInt(item.ord_price.toFixed())
              )
            }}
          </template>
        </p>
      </div>
    </div>
  </div>
  <div class="reference_order__back">
    <router-link to="/reference/order/jp" class="button button__white button__medium" 
      >注文一覧へ</router-link
    >
  </div>
</template>

<script>
import onnoRecord from "@/assets/js/page/reference/order/onnoRecord";
export default onnoRecord;
</script>
