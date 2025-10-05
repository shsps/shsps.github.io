<template>
  <div class="signature-pad-tool-layout">
    <div class="title"><span>新增簽名</span></div>
    
    <div class="sign-area" ref="signArea">
      <div class="sign-area-title">
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
    }
  },
  methods: {
    init() {
      if(this.$refs.signArea) {
        this.signPadProperty = {
          width: `${this.$refs.signArea.clientWidth}px`,
          height: `${this.$refs.signArea.clientHeight}px`,
        }
        this.isInit = true;
      } else {
        throw new Error('Initialize failed : Cant find signArea');
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
  }
}
</script>

<style scoped lang="scss">
$green01: #42B3CC;
$green02: #EDF8FA;
$red01: #B86E6E;

.signature-pad-tool-layout {
  width: 100%;
  max-width: 1100px;
  height: 100%;
  max-height: 700px;
  padding: 40px 22px;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}
.title {
  color: $green01;
  font-size: 20px;
  font-weight: 600;
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
    justify-content: center;
    align-items: flex-end;
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