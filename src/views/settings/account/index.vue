<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>

    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/settings/"><strong>口座・設定</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">口座情報</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <h1 class="title">口座情報</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="settings__table card card--sphidden">
              <div class="settings__index">
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>証券口座番号</p>
                  </div>
                  <div class="settings__index-value">
                    <p>{{ infoData.SECURITY_ACCOUNT_NUMBER }}</p>
                  </div>
                  <div class="settings__index-button"></div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>ログインID（メールアドレス）</p>
                  </div>
                  <div class="settings__index-value">
                    <p>{{ this.infoData.EMAIL }}</p>
                  </div>
                  <div class="settings__index-button"></div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>お客様の氏名</p>
                  </div>
                  <div class="settings__index-value">
                    <p>{{ this.infoData.NAME }}</p>
                    <p>{{ this.infoData.KANA_NAME }}</p>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('name', userName)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div class="settings__index-button">
                    <a
                      href="javascript:;"
                      class="button button__main button__chip"
                      @click="routerTo('name', userName)"
                    >
                      <img src="/assets/images/pen_b.png" alt="" />
                      変更</a
                    >
                  </div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>年齢</p>
                  </div>
                  <div class="settings__index-value">
                    <p>{{ getAge }}</p>
                  </div>
                  <div class="settings__index-button"></div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>性別</p>
                  </div>
                  <div class="settings__index-value">
                    <p>
                      {{ getSex }}
                    </p>
                  </div>
                  <div class="settings__index-button"></div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>住所</p>
                  </div>
                  <div class="settings__index-value">
                    <p>{{ userAddress.userAddress1 }}</p>
                    <p>
                      {{ this.userAddress.userAddress2 }}
                    </p>
                    <p>{{ this.userAddress.userAddress3 }}</p>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('address', userAddress)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div class="settings__index-button">
                    <a
                      href="javascript:;"
                      class="button button__main button__chip"
                      @click="routerTo('address', userAddress)"
                    >
                      <img src="/assets/images/pen_b.png" alt="" />
                      変更</a
                    >
                  </div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>携帯電話番号</p>
                  </div>
                  <div class="settings__index-value">
                    <p>{{ userTEL }}</p>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('phone', userTEL)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div class="settings__index-button">
                    <a
                      href="javascript:;"
                      class="button button__main button__chip"
                      @click="routerTo('phone', userTEL)"
                    >
                      <img src="/assets/images/pen_b.png" alt="" />
                      変更</a
                    >
                  </div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>職業・勤務先</p>
                  </div>
                  <div class="settings__index-value">
                    <div
                      class="settings__index-value-list"
                      v-for="(item, index) in professional"
                      :key="index"
                    >
                      <p>
                        <small>{{ item.title }}</small>
                      </p>
                      <p>{{ item.text }}</p>
                    </div>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('occupation', professional)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div class="settings__index-button">
                    <a
                      href="javascript:;"
                      class="button button__main button__chip"
                      @click="routerTo('occupation', professional)"
                    >
                      <img src="/assets/images/pen_b.png" alt="" />
                      変更</a
                    >
                  </div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>お客様に関係する上場企業</p>
                  </div>
                  <div
                    v-if="relatedEnterprises[0] !== '該当しない'"
                    class="settings__index-value"
                  >
                    <div
                      v-for="(item, index) in relatedEnterprises"
                      :key="index"
                    >
                      <div class="settings__index-value-list">
                        <p><small>企業名</small></p>
                        <p>{{ item.name }}</p>
                      </div>
                      <div class="settings__index-value-list">
                        <p>
                          <small>お客様に関係する上場企業との関係</small>
                        </p>
                        <p>{{ item.relation }}</p>
                      </div>
                    </div>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('company', relatedEnterprises)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div v-else class="settings__index-value">
                    <div class="settings__index-value-list">
                      <p>{{ relatedEnterprises[0] }}</p>
                    </div>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('company', relatedEnterprises)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div class="settings__index-button">
                    <a
                      href="javascript:;"
                      class="button button__main button__chip"
                      @click="routerTo('company', relatedEnterprises)"
                    >
                      <img src="/assets/images/pen_b.png" alt="" />
                      変更</a
                    >
                  </div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>国籍</p>
                  </div>
                  <div class="settings__index-value">
                    <p>日本</p>
                    <p class="settings__index-value-error">
                      <img src="/assets/images/exclamation.png" alt="!" />
                      国籍を変更されるお客さまは、事前にカスタマーセンターまでご連絡ください。
                    </p>
                    <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
                    <a :href="CONTACT"  
                      target="_blank"
                      class="settings__index-value-link"
                      >カスタマーセンター</a
                    >
                  </div>
                  <div class="settings__index-button"></div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>日本以外の居住地国</p>
                  </div>
                  <div class="settings__index-value">
                    <p>なし</p>
                    <p class="settings__index-value-error">
                      <img src="/assets/images/exclamation.png" alt="!" />
                      居住地国日本以外に変更されるお客様は、弊社カスタマーセンターまでお問い合わせください。
                    </p>
                    <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
                    <a :href="CONTACT" target="_blank" 
                      class="settings__index-value-link"
                      >カスタマーセンター</a
                    >
                  </div>
                  <div class="settings__index-button"></div>
                </div>
                <div
                  class="settings__index-row"
                  v-if="subTittle === 'CHEER証券'"
                >
                  <div class="settings__index-title">
                    <p>出金先金融機関</p>
                  </div>
                  <div class="settings__index-value">
                    <div class="settings__index-value-list">
                      <p><small>金融機関</small></p>
                      <p>{{ infoBank[0] }}</p>
                    </div>
                    <div class="settings__index-value-list">
                      <p><small>支店名</small></p>
                      <p>{{ infoBank[1] }}</p>
                    </div>
                    <div class="settings__index-value-list">
                      <p><small>口座区分</small></p>
                      <p>{{ infoBank[2] }}</p>
                    </div>
                    <div class="settings__index-value-list">
                      <p><small>口座番号</small></p>
                      <p>{{ infoBank[3] }}</p>
                    </div>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('bank', infoBank)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div class="settings__index-button">
                    <a
                      href="javascript:;"
                      class="button button__main button__chip"
                      @click="routerTo('bank', infoBank)"
                    >
                      <img src="/assets/images/pen_b.png" alt="" />
                      変更</a
                    >
                  </div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>投資経験</p>
                  </div>
                  <div class="settings__index-value">
                    <div class="settings__index-value-list">
                      <p><small>国内株式の取引経験</small></p>
                      <p>{{ infoInvest[0] }}</p>
                    </div>
                    <div class="settings__index-value-list">
                      <p><small>外国株式の取引経験</small></p>
                      <p>{{ infoInvest[1] }}</p>
                    </div>
                    <div
                      class="settings__index-value-list"
                      v-if="subTittle === 'CHEER証券'"
                    >
                      <p><small>投資信託の取引経験</small></p>
                      <p>{{ infoInvest[2] }}</p>
                    </div>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('experience', infoInvest)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div class="settings__index-button">
                    <a
                      href="javascript:;"
                      class="button button__main button__chip"
                      @click="routerTo('experience', infoInvest)"
                    >
                      <img src="/assets/images/pen_b.png" alt="" />
                      変更</a
                    >
                  </div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>ご希望の取引種類</p>
                  </div>
                  <div class="settings__index-value">
                    <p>{{ inforDesired }}</p>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('type', inforDesired)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div class="settings__index-button">
                    <a
                      href="javascript:;"
                      class="button button__main button__chip"
                      @click="routerTo('type', inforDesired)"
                    >
                      <img src="/assets/images/pen_b.png" alt="" />
                      変更</a
                    >
                  </div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>主な収入源</p>
                  </div>
                  <div class="settings__index-value">
                    <p>{{ sourceIncome }}</p>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('income', sourceIncome)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div class="settings__index-button">
                    <a
                      href="javascript:;"
                      class="button button__main button__chip"
                      @click="routerTo('income', sourceIncome)"
                    >
                      <img src="/assets/images/pen_b.png" alt="" />
                      変更</a
                    >
                  </div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>金融資産</p>
                  </div>
                  <div class="settings__index-value">
                    <p>{{ financialAssets }}</p>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('property', financialAssets)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div class="settings__index-button">
                    <a
                      href="javascript:;"
                      class="button button__main button__chip"
                      @click="routerTo('property', financialAssets)"
                    >
                      <img src="/assets/images/pen_b.png" alt="" />
                      変更</a
                    >
                  </div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>お取引の動機</p>
                  </div>
                  <div class="settings__index-value">
                    <p>{{ motivationTrading }}</p>
                  </div>
                  <div class="settings__index-button"></div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>投資目的</p>
                  </div>
                  <div class="settings__index-value">
                    <p>{{ investmentPurposes }}</p>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('purpose', investmentPurposes)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div class="settings__index-button">
                    <a
                      href="javascript:;"
                      class="button button__main button__chip"
                      @click="routerTo('purpose', investmentPurposes)"
                    >
                      <img src="/assets/images/pen_b.png" alt="" />
                      変更</a
                    >
                  </div>
                </div>
                <div class="settings__index-row">
                  <div class="settings__index-title">
                    <p>商品等に関する広告メール</p>
                  </div>
                  <div class="settings__index-value">
                    <p>{{ advertising }}</p>
                    <a
                      href="javascript:;"
                      class="settings__index-button--sp"
                      @click="routerTo('mail', advertising)"
                      ><img src="/assets/images/pen.png" alt=""
                    /></a>
                  </div>
                  <div class="settings__index-button">
                    <a
                      href="javascript:;"
                      class="button button__main button__chip"
                      @click="routerTo('mail', advertising)"
                    >
                      <img src="/assets/images/pen_b.png" alt="" />
                      変更</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="settings__confirm">
              <a
                href="javascript:;"
                class="button button__white button__full button__back"
                @click="$router.push('/settings')"
                ><img src="/assets/images/arrow_back_g.png" alt="" />
                口座情報・設定画面へ</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import account from "@/assets/js/page/settings/account/index";
export default account;
</script>

<style></style>
