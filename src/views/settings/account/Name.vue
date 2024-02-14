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
        <a href="">お客様の氏名の変更</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <h1 class="title">お客様の氏名の変更</h1>
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
                    <p>現在のお客様の氏名</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ oldNameData.userName }}</p>
                    <p>{{ oldNameData.userNameKana }}</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>新しいお客様の氏名</p>
                  </div>
                  <div class="table__box-value">
                    <div class="settings__table-input">
                      <div>
                        <p>姓</p>
                        <input
                          v-model="newNameData.newName1"
                          type="text"
                          maxlength="30"
                          placeholder="姓"
                          @blur="blurHandle('newName1', newNameData.newName1)"
                        />
                        <div class="inputMessage_value">
                          <p v-show="newName1Err">
                            姓を全角で入力してください
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>名</p>
                        <input
                          v-model="newNameData.newName2"
                          type="text"
                          maxlength="30"
                          placeholder="名"
                          @blur="blurHandle('newName2', newNameData.newName2)"
                        />
                        <div class="inputMessage_value">
                          <p v-show="newName2Err">
                            名を全角で入力してください
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="settings__table-input">
                      <div>
                        <p>姓（カナ）</p>
                        <input
                          v-model="newNameData.newNameKana1"
                          type="text"
                          maxlength="30"
                          placeholder="セイ"
                          @blur="blurHandle('newNameKana1', newNameData.newNameKana1)"
                        />
                        <div class="inputMessage_value">
                          <p v-show="newNameKana1Err">
                            姓をカタカナで入力してください
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>名（カナ）</p>
                        <input
                          v-model="newNameData.newNameKana2"
                          type="text"
                          maxlength="30"
                          placeholder="メイ"
                          @blur="blurHandle('newNameKana2', newNameData.newNameKana2)"
                        />
                        <div class="inputMessage_value">
                          <p v-show="newNameKana2Err">
                            名をカタカナで入力してください
                          </p>
                        </div>
                      </div>
                    </div>
                    <p class="settings__table-text--error">
                      <img src="/assets/images/exclamation.png" alt="!" />
                      出金先金融機関の口座名義人も自動にこのフリガナに変更します。
                    </p>
                    <p class="settings__table-text--error">
                      <img src="/assets/images/exclamation.png" alt="!" />
                      出金先金融機関の氏名登録変更が完了していない場合、名義相違で出金失敗になる可能性があります。
                    </p>
                    <div class="settings__table-input">
                      <p>本人確認書類</p>
                    </div>
                    <ul>
                      <li>マイナンバーカード（表面）</li>
                      <li>運転免許証（表面・裏面の両面）</li>
                    </ul>
                    <p class="settings__table-text--error">
                      <img src="/assets/images/exclamation.png" alt="!" />
                      当社外部委託先である株式会社Liquidが提供する本人確認サービス（外部サイト）に移動し、撮影・送信を行います。
                    </p>
                  </div>
                </div>
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
                  @click="change"
                  :class="[
                    { disable: !isAllFinished },
                    'button button__main button__medium',
                  ]"
                  >オンラインで提出</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <dialog-pwd
    v-if="showDialog"
    :formData="formData"
    @btnCancel="cancel"
  ></dialog-pwd>
</template>

<script>
import name from "@/assets/js/page/settings/account/name";
export default name;
</script>

<style></style>
