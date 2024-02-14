<template>
  <div>
    <header class="header nosub">
      <div class="wrapper">
        <div class="header__container">
          <a href="/home" class="header__logo">
            <img src="/assets/images/logo.svg" alt="サイトロゴ" />
          </a>
        </div>
      </div>
    </header>
    <Popup></Popup>
    <ExceptionError />
    <slot />
    <Footer />
  </div>
</template>

<script src="@/assets/js/components/layout/defaultLayout.js"></script>
