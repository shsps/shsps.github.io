<template>
  <div v-if="data" style="width: 100%;">
    <div class="table-header">
      <span class="table-header-item item1">承攬項目</span>
      <span class="table-header-item item2">保額</span>
      <span class="table-header-item item3">賠償範圍</span>
    </div>
    <div class="table-body">
      <div class="table-row" v-for="(item, index) in data" :key="index">
        <div class="item1">
          <div class="sub-table">
            <div class="category">{{ item.title }}</div>
            <div class="sub-category">
              <div
                class="sub-category-item"
                v-for="(subItem, subIndex) in item.content"
                :key="`1-${subIndex}`"
              >{{ subItem.title }}</div>
            </div>
          </div>
        </div>
        <div class="item2 sub-row">
          <div
            class="sub-row-item"
            style="justify-content: center;"
            v-for="(subItem, subIndex) in item.content"
            :key="`2-${subIndex}`"
          >{{ formatNumberToChinese(subItem.coverage) }}</div>
        </div>
        <div class="item3 sub-row">
          <div
            class="sub-row-item"
            v-for="(subItem, subIndex) in item.content"
            :key="`3-${subIndex}`"
          >{{ subItem.detail }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    data: {
      type: Array,
      required: true,
      /**
       * structure:
       * [
       *  {
       *    title: '',
       *    content: [
       *      {
       *        title: '',
       *        coverage: '',
       *        detail: '',
       *      }
       *    ]
       *  }
       */
    },
  },
  data() {
    return {};
  },
  methods: {
    // formatNumberToChinese(number) {
    //     const input = Number(number);

    //     if (isNaN(input)) {
    //         throw new Error("輸入值不是合法數字");
    //     }
    //     const tenThousandCount = Math.floor(input / 10000);
    //     if (tenThousandCount === 0) {
    //         return `${input.toString()} 元`;
    //     }
    //     return `${tenThousandCount} 萬元`;
    // },
  },
  computed: {
    ...mapGetters(['formatNumberToChinese']),
  },
};
</script>

<style scoped lang="scss">
.item1 {
  flex: 1;
}
.item2 {
  width: 140px;
}
.item3 {
  flex: 2;
}
.table-header {
  width: 100%;
  display: flex;
  padding: 10px;
  gap: 10px;
  font-size: 18px;
  line-height: 35px;
  .table-header-item {
    background-color: #005faa;
    border-radius: 10px;
    color: #ffffff;
    text-align: center;
  }
}
.table-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  .table-row {
    width: 100%;
    display: flex;
    padding: 10px;
    gap: 10px;
    .item2 {
      text-align: center;
    }
    .sub-row {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .sub-row-item {
        padding: 8px 0;
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
  }
}
.sub-table {
  width: 100%;
  display: flex;
  gap: 9px;
  .category {
    background-color: #005faa;
    border-radius: 10px;
    color: #ffffff;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 10px;
  }
  .sub-category {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .sub-category-item {
      background-color: #e6eff7;
      border-radius: 10px;
      color: black;
      text-align: left;
      padding: 8px 0 8px 20px;
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      align-items: center;
    }
  }
}
</style>