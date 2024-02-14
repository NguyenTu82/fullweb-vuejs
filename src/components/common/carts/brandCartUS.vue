<template>
  <router-link
    :to="redirectTo(id)"
    :class="['list_card', isSelected ? 'bg--active' : '']"
  >
    <div class="list_card__title">
      <h2>{{ brandName || "" }}</h2>
    </div>
    <div class="list_card__subtext">
      <h3>{{ handleBrandCd() }}</h3>
    </div>
    <div class="list_card__detail">
      <div class="list_card__detail-price">
        <p>参考買値（USD）</p>
        <p class="high">
          <strong>{{ checkNumber(buyPrice, handNumber(buyPrice)) }}</strong>
        </p>
      </div>
      <div class="list_card__detail-price">
        <p>参考売値（USD）</p>
        <p class="low">
          <strong>{{ checkNumber(sellPrice, handNumber(sellPrice)) }}</strong>
        </p>
      </div>
      <div class="list_card__detail-price">
        <p>予想配当利回り（年率）</p>
        <p class="list_card__detail-price--black">
          <strong>{{
            checkNumber(percent, handNumber(percent * 100), "%")
          }}</strong>
        </p>
      </div>
    </div>
  </router-link>
</template>

<script src="@/assets/js/components/common/carts/brandCartUS.js"></script>

<style scoped></style>
