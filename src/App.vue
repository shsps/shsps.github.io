

<template>
  <div class="root">
    <div class="page-list">
      <!-- <Sidebar></Sidebar> -->
      <Sidebar2></Sidebar2>
    </div>
    <div class="page">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Sidebar from "./elements/sidebar/SideBar.vue";
import Sidebar2 from "./elements/sidebar/SIdeBar2.vue";

export default {
  components: {
    RouterView,
    Sidebar,
    Sidebar2,
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  mounted() {
    var name = 'Roger';
    var obj = {
      x: function() {
        name = 'james';
        console.log(this.name)
      },
      y: ()=> {
        name = 'james';
        console.log(this.name)
      }
    }

    obj.y();
  },
  created() {
    //在頁面載入時讀取sessionStorage裡的狀態資訊
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在頁面重新整理時將vuex裡的資訊儲存到sessionStorage裡
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>

<style scoped lang="scss">
.root {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 100%;
  width: 100%;
  height: 100%;
}
.page-list {
  grid-area: 1 / 1 / 2 / 2;
}
.page {
  grid-area: 1 / 2 / 2 / 3;
}
</style>

<style>
* {
  box-sizing: border-box;
}
</style>