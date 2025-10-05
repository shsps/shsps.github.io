<template>
  <div v-if="isInit" class="sidebar">
    <div 
    v-for="(item, index) in showMenuItems" 
    :key="index" 
    class="sidebar-item"
    @mouseenter="onMouseEnter(item)"
    @mouseleave="onMouseLeave(item)"
    >
      <div 
      class="main-item" 
      :style="{ backgroundColor: item.expanded || item.selected ? '#0169AF' : null, color: item.expanded || item.selected ? '#fff' : null }"
      @click="selectItem(item)" 
      >
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
        <i v-if="item.subItems" :class="item.expanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up'"></i>
      </div>
      <transition name="slide-fade">
        <div v-if="item.subItems && item.expanded" class="sub-menu">
          <div 
          v-for="(subItem, subIndex) in item.subItems" 
          :key="subIndex" 
          class="sub-item"
          :style="{ color: subItem.selected ? '#0169AF' : null }"
          @click="selectItem(subItem)">
            <i :class="subItem.icon"></i>
            <span>{{ subItem.title }}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import SideBarController from './SideBarController';

export default {
  data() {
    return {
      isInit: false,
      menuItems: [
        {
          title: '首頁',
          icon: 'fa-solid fa-check',
          link: '/',
        },
        {
          title: '基本元件',
          icon: 'fa-solid fa-check',
          subItems: [
            { title: 'Button', icon: 'fa-solid fa-check', link: '/normal/button' },
            { title: 'Checkbox', icon: 'fa-solid fa-check', link: '/normal/checkbox' },
            { title: 'DatePicker', icon: 'fa-solid fa-check', link: '/normal/datepicker' },
            { title: 'Input', icon: 'fa-solid fa-check', link: '/normal/input' },
            { title: 'Select', icon: 'fa-solid fa-check', link: '/normal/select' },
          ],
        },
        {
          title: '測試區',
          icon: 'fa-solid fa-check',
          subItems: [
            { title: '測試1', icon: 'fa-solid fa-check', link: '/normal/button' },
            { title: '測試2', icon: 'fa-solid fa-check', link: '/normal/checkbox' },
            { title: '測試3', icon: 'fa-solid fa-check', link: '/normal/datepicker' },
            { title: '測試4', icon: 'fa-solid fa-check', link: '/normal/input' },
            { title: '測試5', icon: 'fa-solid fa-check', link: '/normal/select' },
          ],
        },
        {
          title: '進度條',
          icon: 'fa-solid fa-check',
          link: '/progressbar',
        },
        {
          title: '簽名板',
          icon: 'fa-solid fa-check',
          link: '/signature',
        },
        {
          title: '表格',
          icon: 'fa-solid fa-check',
          link: '/table',
        },
        {
          title: '地址',
          icon: 'fa-solid fa-check',
          link: '/address',
        },
        {
          title: 'OTP輸入框',
          icon: 'fa-solid fa-check',
          link: '/otp-input',
        },
        {
          title: '圖表',
          icon: 'fa-solid fa-check',
          link: '/chart',
        },
      ],
      showMenuItems: null,
      isAutoExpand: true,
    }
  },
  methods: {
    init() {
      this.showMenuItems = SideBarController.Init(this.menuItems, this.isAutoExpand);
      if(this.$store.state.sidebarId) {
        SideBarController.SelectItem(this.$store.state.sidebarId);
      }

      this.isInit = true;
    },
    selectItem(item) {
      const selectedItem = SideBarController.SelectItem(item.id);
      this.$store.commit('setSidebarId', selectedItem.id);
      if(!selectedItem?.subItems) {
        this.goToPage(selectedItem.link);
      }
    },
    onMouseEnter(item) {
      if(item.subItems && !this.isAutoExpand) {
        SideBarController.ExpandItem(item.id);
      }
    },
    onMouseLeave(item) {
      if(item.subItems && !this.isAutoExpand) {
        SideBarController.CollapseItem(item.id);
      }
    },
    goToPage(link) {
      this.$router.push(link);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f8f9fa;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-item {
  cursor: pointer;
}

.main-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
  gap: 10px;
  color: #0169AF;
  font-size: 20px;
  font-weight: 700;
  border-radius: 15px;
}

.main-item:hover {
  background-color: #0169AF;
  color: #fff;
}

/* .main-item i {
  margin-right: 10px;
} */

.sub-menu {
  color: #5398D0;
  font-weight: 700;
}

/* Vue transition classes */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.sub-item {
  display: flex;
  align-items: center;
  padding: 8px 20px 8px 40px;
  transition: background-color 0.3s ease;
}

// .sub-item:hover {
//   background-color: #5398D0;
//   color: #fff;
// }

.sub-item i {
  margin-right: 10px;
}

/* ... other existing styles ... */
</style>