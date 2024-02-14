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
        <a href="/account/"><strong>口座情報</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">お客様に関係する上場企業の変更</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <h1 class="title">お客様に関係する上場企業の変更</h1>
        <div class="container card">
          <div class="card__help">
            <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
            <a
              :href="HELPACCOUNT"
              target="_blank"
              >本画面のヘルプ
              <img src="/assets/images/question.png" alt="" />
            </a>
          </div>
          <div class="l_tab_wrapper">
            <div class="settings__table card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>現在のお客様に関係する上場企業</p>
                  </div>
                  <div
                    class="table__box-value"
                    v-if="oldCompany[0] !== '該当しない'"
                  >
                    <div
                      v-for="(item, index) in oldCompany"
                      :key="index"
                      class="settings__table-value"
                    >
                      <div>
                        <p><span>企業名</span></p>
                        <p>{{ item.name }}</p>
                      </div>
                      <div>
                        <p><span>お客様に関係する上場企業との関係</span></p>
                        <p>{{ item.relation }}</p>
                      </div>
                    </div>
                  </div>
                  <div v-else class="table__box-value">
                    <div class="settings__table-value">
                      <p>{{ oldCompany[0] }}</p>
                    </div>
                  </div>
                </div>
                <template v-if="newCompany.length === 0">
                  <div class="table__box">
                    <div class="table__box-title">
                      <p>新しいお客様に関係する上場企業</p>
                    </div>
                    <div class="table__box-value">該当しない</div>
                  </div>
                </template>
                <template v-else>
                  <div
                    class="table__box"
                    v-for="(item, index) in newCompany"
                    :key="index"
                  >
                    <div class="table__box-title">
                      <p>新しいお客様に関係する上場企業</p>
                    </div>
                    <div class="table__box-value">
                      <div class="settings__table-input">
                        <div>
                          <p>企業名</p>
                          <input
                            type="text"
                            v-model="newCompany[index].name"
                            placeholder="企業名を入力してください"
                          />
                        </div>
                        <button
                          class="
                            button button__main button__chip
                            settings__table-reset
                          "
                          @click="del(index)"
                        >
                          <img src="/assets/images/trash.png" alt="ゴミ箱" />
                          削除
                        </button>
                        <a
                          href="javascript:;"
                          :class="[
                            { disable: !btnFlags[index] },
                            'button button__main button__chip',
                          ]"
                          @click="search(index)"
                        >
                          企業名検索
                        </a>
                      </div>
                      <div class="settings__table-input">
                        <div>
                          <p>お客さまに関係する上場企業との関係</p>
                          <select
                            class="selectbox selectbox__gray"
                            name="address_prefecture"
                            id=""
                            v-model="newCompany[index].insider"
                          >
                            <option :value="0" style="display: none">
                              選択してください
                            </option>
                            <option
                              v-for="(item, ind) in insiderTypes"
                              :key="ind"
                              :value="ind + 1"
                            >
                              {{ item }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="settings__add" v-if="newCompany.length < 5">
                <button class="button" @click="add">
                  他の企業を追加する
                  <img src="/assets/images/plus.png" alt="+" />
                </button>
              </div>
              <div class="settings__confirm">
                <a
                  href="javascript:;"
                  @click="$router.back()"
                  class="button button__white button__medium"
                  >キャンセル</a
                >
                <a
                  href="javascript:;"
                  :class="[
                    { disable: !btnFlag },
                    'button button__main button__medium',
                  ]"
                  @click="change"
                  >変更する</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- 「取引暗証番号」入力画面  star -->
  <dialog-pwd
    v-if="showDialog"
    :formData="formData"
    :API="API"
    @btnCancel="cancel"
  ></dialog-pwd>
  <!-- 「取引暗証番号」入力画面  end -->

  <!-- 検索画面 star -->
  <Search
    v-if="searchDialog"
    :searchTitle="searchTitle"
    :enterprise="enterprise"
    :searchResolve="text"
    @searchOK="searchOK"
    @searchCancel="searchCancel"
  ></Search>
  <!-- 検索画面 end -->
</template>

<script>
import company from "@/assets/js/page/settings/account/company";
export default company;
</script>

<style></style>
