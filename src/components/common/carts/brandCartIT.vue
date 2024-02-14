<template>
  <router-link
    :class="['list_card', isSelected ? 'bg--active' : '']"
    :to="redirectTo(inv_trust_assoc_cd)"
  >
    <div class="list_card__title list_card__title--two">
      <h2>
        {{ brand["fund_abb_nm"] }} {{ fund_nicknm ? `(${fund_nicknm})` : "" }}
      </h2>
    </div>
    <div class="list_card__subtext">
      <div class="list_card__type-tags">
        <p class="tag" v-if="fund_attr_cls_nm !== '一般型'">
          {{ fund_attr_cls_nm }}
        </p>
        <p
          class="tag"
          v-for="(type, key) in brand['fund_type_list']"
          :key="key"
        >
          {{ type["fund_type_nm"] }}
        </p>
      </div>
    </div>
    <div class="list_card__detail">
      <div class="list_card__detail-price">
        <p>基準価格</p>
        <p class="list_card__detail-price">
          <strong>{{
            checkNumber(number_format(brand.price, 0), "円")
          }}</strong>
        </p>
      </div>
      <div class="list_card__detail-price">
        <p>前日比（率）</p>
        <p
          :class="[
            'comparison_text--card comparison_text--table',
            brand.day_before_rate > 0
              ? 'high'
              : brand.day_before_rate < 0
              ? 'low'
              : '',
          ]"
        >
          {{ brand.day_before_rate > 0 ? "+" : ""
          }}{{ number_format(brand.day_before_rate, 0) }}<small>円</small
          ><small
            >({{ brand.day_before_ratio > 0 ? "+" : ""
            }}{{ handNumber(brand.day_before_ratio, 2) }}%)</small
          >
        </p>
      </div>
    </div>
  </router-link>
</template>

<script src="@/assets/js/components/common/carts/brandCartIT.js"></script>

<style scoped></style>
