<template>
  <Transition name="slide-fade">
    <div
      class="side-bar-container"
    >
      <div class="side-bar-area">
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.title"
            class="flex flex-col sidebar-btn-layout"
          >
            <div class="main-menu sidebar-btn color1" 
              :class="{ 'active': (isActive === key) }"
              v-if="!item.isNotShowOnSidebar"
              @click="
              setTitle(item);
              ">
              <i :class="item.icon" class="sidebar-icon"></i>
              <span>{{ item.title }}</span>
              <svg v-if="item.subMenuItems" class="expand-btn" :class="{'expand':item.isExpand}" xmlns="http://www.w3.org/2000/svg" width="18" height="10.5" viewBox="0 0 12 7">
                <path d="M5.47036 6.52969C5.76333 6.82266 6.23911 6.82266 6.53208 6.52969L11.0321 2.02969C11.325 1.73672 11.325 1.26094 11.0321 0.967968C10.7391 0.674999 10.2633 0.674999 9.97036 0.967968L6.00005 4.93828L2.02974 0.970312C1.73677 0.677343 1.26099 0.677343 0.968018 0.970312C0.675049 1.26328 0.675049 1.73906 0.968018 2.03203L5.46802 6.53203L5.47036 6.52969Z"/>
              </svg>
            </div>
            <div class="sub-menu">
              <ul v-if="item.isExpand">
                <li
                  v-for="inner_item in item.subMenuItems"
                  :key="inner_item.label"
                  class="flex sidebar-btn color2"
                  :class="{ 'active': isActive === inner_item.label }"
                  @click="
                    setTitle(inner_item);
                  "
                >
                  <i class="sidebar-icon"></i>
                  <span>{{ inner_item.label }}</span>
                  <div v-if="inner_item.label === '暫存資料'" class="number-icon">{{ temporaryLength }}</div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <!-- 底下的登出按鈕，暫時隱藏 -->
      <div class="side-bar-area">
        <ul>
          <li
            v-for="(item, key) in bottomMenuItems"
            :key="key"
            class="flex flex-col sidebar-btn-layout"
          >
            <div class="main-menu sidebar-btn color1" 
              :class="{ 'active': (isActive === key && !item.subMenuItems) }"
              @click="
              setTitle(item, key);
              ">
              <i :class="item.icon" class="sidebar-icon"></i>
              <span>{{ item.title }}</span>
              <svg v-if="item.subMenuItems" class="expand-btn" :class="{'expand':item.isExpand}" xmlns="http://www.w3.org/2000/svg" width="18" height="10.5" viewBox="0 0 12 7">
                <path d="M5.47036 6.52969C5.76333 6.82266 6.23911 6.82266 6.53208 6.52969L11.0321 2.02969C11.325 1.73672 11.325 1.26094 11.0321 0.967968C10.7391 0.674999 10.2633 0.674999 9.97036 0.967968L6.00005 4.93828L2.02974 0.970312C1.73677 0.677343 1.26099 0.677343 0.968018 0.970312C0.675049 1.26328 0.675049 1.73906 0.968018 2.03203L5.46802 6.53203L5.47036 6.52969Z"/>
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
  
</template>

<script>
import { useRoute } from "vue-router";

export default {
  components: {},
  data() {
    return {
      isActive: null,
      expandWhichItemNow: null,
      menuItems: [
        {
          title: '新增詢價申請',
          path: '/new-insured1',
          icon: 'fa-solid fa-layer-group',
          buttons: [
            {
              title: '確認送出',
              icon: 'fa-solid fa-check',
              borderRadius: '4px',
            }
          ]
        },
        {
          title: '詢價紀錄',
          path: '/inquire-record',
          icon: 'fa-solid fa-layer-group',
          buttons: []
        },
        {
          isNotShowOnSidebar: true,
          title: '詢價明細',
          path: '/inquire-record-detail',
          icon: 'fa-solid fa-arrow-left',
          buttons: []
        }
      ],
      bottomMenuItems: [
        {
          title: "登出",
          path: '/logout',
          icon: 'fa-solid fa-arrow-right-to-bracket'
        },
      ],
    };
  },
  methods: {
    cloeSideBar() {
    },
    setTitle(item) {
      this.updateIsActive(item.path);
      if(item.path == '/logout') {
        this.handleLogout();
        return;
      }
      this.$router.push(item.path);
    },
    handleLogout() {
    },
    updateIsActive(currentRoutePath) {
      // 重整時依據當前網址更新sideBar active 樣式
      if(currentRoutePath == '/') {
        this.isActive = '/new-insured1';
      } else {
        this.isActive = currentRoutePath;
      }
    },
  },
  computed: {
    shouldRenderBuildInsurance() {
      let saasStyle = store.state.saasStyle;
      if (saasStyle == null) {
        saasStyle = "0";
      }
      return saasStyle;
    },
  },
  mounted() {
    const currentRoutePath = useRoute().path;
    this.updateIsActive(currentRoutePath);
  },
};
</script>

<style scoped lang="scss">
.side-bar-container {
  height: 100%;
  width: 100%;
  background: white;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-between;
  align-items: center;
  .side-bar-area {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}

.title {
  font-size: 20px;
  font-weight: 500;
  color: var(--blue01);
  text-align: center;
  padding: 24px;
}
// .sidebar {
//   background: var(--blue03);
// }
.sidebar-btn-layout {
  > .main-menu {
    width: 200px;
    height: 50px;
    .expand-btn {
      display: inline;
      margin-left: 10px;
    }
    .expand {
      transform: scaleY(-1);
    }
  }
  > .sub-menu {
    width: 200px;
    height: auto;
    display: flex;
  }
  .sidebar-btn {
    width: 200px;
    height: 50px;
    align-items: center;
    padding: 10px 10px;
    transition: all 0.4s;
    cursor: pointer;
    margin-bottom: 12px;
    font-size: 18px;
    .sidebar-icon {
      width: 50px;
      text-align: center;
    }
  }
  .color1 {
    color: var(--sidebar-btn);
    fill: var(--sidebar-btn);
  }
  .color2 {
    color: #90BCD8;
  }
  .color1:hover, .color2:hover {
    background: var(--sidebar-btn);
    color: var(--message-text);
    fill: var(--message-text);
  }
  
  // .sidebar-btn:hover {
  //   background: var(--sidebar-btn);
  //   color: var(--message-text);
  // }
  .active {
    color: var(--blue02);
  }
  .number-icon {
    background-color: #E45E5E;
    color: white;
    border-radius: 16px;
    display: flex;
    width: 25px;
    height: 25px;
    padding: 4px 3px;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
  }
}

.logout {
  border: 3px solid transparent;
  margin-bottom: 75px;
  span {
    text-align: center;
    width: 100%;
  }
  &:hover {
    border: 3px solid var(--blue01);
  }
}

</style>
