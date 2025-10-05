<template>
  <div v-if="showMenuItem" class="menu-layout">
    <div 
    class="menu-item clickable" 
    :class="{'menu-item-selected': item.isSelected}" 
    v-for="item in showMenuItem" 
    :key="item.id"
    @click.self="selectMenuItem(item)"
    @mouseenter="mouseEnterMenuItem(item)"
    @mouseleave="mouseLeaveMenuItem(item)"
    >
      {{ item.title }}
      <div v-if="item.subMenuItem" class="expand-icon">
        <i class="fa-solid fa-chevron-down"></i>
      </div>
      <div v-if="item.subMenuItem && item.isExpanded" class="sub-menu-item-container">
        <div 
        class="sub-menu-item clickable" 
        :class="{'sub-menu-item-selected': subItem.isSelected}" 
        v-for="subItem in item.subMenuItem" 
        :key="subItem.id"
        @click.self="selectMenuItem(subItem)"
        >
          {{ subItem.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuController from './MenuController';

export default {
  data() {
    return {
      menuItem: {
        'MANAGER': [
          {
            title: '已簽核名單',
            link: '/director/approved'
          },
          {
            title: '待簽核名單',
            link: '/director/pending'
          }
        ],
        'HR': [
          {
            title: '已完成報聘名單',
            subMenuItem: [
              {
                title: '報聘名單',
                link: '/hr/apply'
              },
              {
                title: '匯出報聘名單',
                link: '/hr/export'
              }
            ]
          },
          {
            title: '所有報聘名單',
            link: '/hr/allList'
          },
          {
            title: '待簽核名單',
            link: '/hr/pending'
          },
        ],
        'ADMIN': [
          {
            title: '帳號管理',
            link: '/admin'
          }
        ],
      },
      showMenuItem: null,
    }
  },
  methods: {
    init() {
      this.showMenuItem = MenuController.Init(this.menuItem[this.$store.state.identityString]);
      if(this.$store.state.menuIdNow === null) {
        MenuController.SelectItem(this.showMenuItem[this.showMenuItem.length - 1].id);
      } else {
        MenuController.SelectItem(this.$store.state.menuIdNow);
      }
    },
    mouseEnterMenuItem(item) {
      if(item.subMenuItem) {
        MenuController.ExpandItem(item.id);
      }
    },
    mouseLeaveMenuItem(item) {
      if(item.subMenuItem) {
        MenuController.CollapseItem(item.id);
      }
    },
    selectMenuItem(item) {
      const selectedItem = MenuController.SelectItem(item.id);
      if(selectedItem) {
        this.$store.commit('setMenuIdNow', selectedItem.id);
        this.navigateTo(selectedItem.link);
      }
    },
    navigateTo(link) {
      this.$router.push(link)
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped lang="scss">
.menu-layout {
  height: 100%;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-item {
  height: 100%;
  padding: 5px 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  color: var(--main-40);
  font-size: 14px;
  font-weight: 500;
  position: relative;
  .expand-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sub-menu-item-container {
    position: absolute;
    z-index: 2;
    top: 100%;
    left: 15px;
    border-radius: 5px;
    background: #FFF;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .sub-menu-item {
      width: 100%;
      padding: 10px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--main-40);
      font-size: 14px;
      font-weight: 500;
    }
  }
}
.menu-item:hover, .sub-menu-item:hover {
  background-color: #ECF5FF;
}
.menu-item-selected, .sub-menu-item-selected {
  color: var(--main) !important;
}
</style>