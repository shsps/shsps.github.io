<template>
  <div class="signature-pad-tool-layout">
    <template v-if="isLandscape">
      <div class="sign-area" ref="signArea">
        <div class="sign-area-title">
          <div class="title"><span>新增簽名</span></div>
          <span>請注意簽名請勿過小、筆畫請勿過少</span>
        </div>

        <VueSignaturePad 
        :options="options"
        class="sign-pad"
        v-if="isInit" 
        :width="signPadProperty.width" 
        :height="signPadProperty.height" 
        ref="signaturePad" />

        <div class="trash-can" @click="clear">
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>

      <div class="button-area">
        <div class="button-style">
          <NormalButton :title="'取消'" 
          :icon="'fa-solid fa-xmark'"
          :color="'#42B3CC'"
          :backgroundColor="'#FFF'"
          :border="'3px solid #42B3CC'"
          :borderRadius="'24px'"
          :iconSize="'16px'"
          disableAnimation
          @OnClick="onClose"
          />
        </div>
        <div class="button-style">
          <NormalButton
          :title="'確定'" 
          :icon="'fa-solid fa-check'"
          :color="'#FFF'"
          :backgroundColor="'#42B3CC'"
          :border="'3px solid #42B3CC'"
          :borderRadius="'24px'"
          :iconSize="'16px'"
          disableAnimation
          @OnClick="save"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="landscape-notice">
        <i class="fa-solid fa-xmark x-mark" @click="onClose"></i>
        <span class="landscape-notice-text">請將手機轉橫向以進行簽名</span>
      </div>
    </template>
  </div>
</template>

<script>
import NormalButton from "./assest/NormalButton.vue"

export default {
  components: { NormalButton },
  emits: ['OnClose', 'OnSave'],
  data() {
    return {
      isInit: false,
      signPadProperty: null,
      // 畫筆設定
      options: {
        dotSize: (3.5 + 5.5) / 2,
        minWidth: 3.5,
        maxWidth: 5.5,
      },
      isLandscape: false,
    }
  },
  methods: {
    init() {
      window.addEventListener('resize', this.windowCheck);
      this.windowCheck();
    },
    initSignPad() {
      if(this.isLandscape) {
        setTimeout(() => {
          if(this.$refs.signArea) {
            this.signPadProperty = {
              width: `${this.$refs.signArea.clientWidth}px`,
              height: `${this.$refs.signArea.clientHeight}px`,
            };
            this.isInit = true;
          } else {
            throw new Error('Initialize failed : Cant find signArea');
          }
        }, 100);
      }
    },
    windowCheck() {
      if(window.innerWidth > window.innerHeight) {
        this.isLandscape = true;
        this.initSignPad();
      } else {
        this.isLandscape = false;
        this.isInit = false;
      }
    },
    clear() {
      this.$refs.signaturePad.clearSignature();
    },
    onClose() {
      this.$emit('OnClose');
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

      if(isEmpty) this.$emit('OnSave', null);
      else this.$emit('OnSave', data.split(",")[1]);
    }
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.windowCheck);
  }
}
</script>

<style scoped lang="scss">
$green01: #42B3CC;
$green02: #EDF8FA;
$red01: #B86E6E;

.signature-pad-tool-layout {
  width: 100%;
  height: 100%;
  padding: 10px 22px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.sign-area {
  width: 100%;
  height: 100%;
  background-color: #EDF8FA;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 47px 1fr 76px;
  .sign-area-title {
    grid-area: 1/1/2/2;
    color: $green01;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    .title {
      color: $green01;
      font-size: 20px;
      font-weight: 600;
    }
  }
  .sign-pad {
    grid-area: 1/1/4/2;
  }
  .trash-can {
    grid-area: 3/1/4/2;
    width: 65px;
    height: 65px;
    margin-right: 15px;
    justify-self: flex-end;
    border-radius: 50%;
    background-color: white;
    font-size: 25px;
    color: $red01;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
.landscape-notice {
  width: 100%;
  height: 100%;
  padding: 10%;
  background-color: $green02;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .x-mark {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .landscape-notice-text {
    font-size: 16px;
    font-weight: 700;
    color: $green01;
    text-align: center;
  }
}
.button-area {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.button-style {
  width: 168px;
  height: 50px;
}
</style>