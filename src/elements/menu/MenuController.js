import { ref } from "vue";

let menuItem = ref(null);
/*
[
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
]
*/
let selectedItemId = 0;

function separateId(id) {
  const idArray = id.split('-');
  idArray.forEach((item, i) => {
    idArray[i] = parseInt(item);
  });
  return idArray;
}

/**
 * 初始化選單，並加入id和初始狀態
 * @param {Array} item 選單資料
 * @returns 選單資料
 */
function Init(item) {
  item.forEach((element, index) => {
    element.id = `${index}`;
    element.isSelected = false;
    if(element.subMenuItem) {
      element.isExpanded = false;
      element.subMenuItem.forEach((subElement, subIndex) => {
        subElement.id = `${index}-${subIndex}`;
        subElement.isSelected = false;
      });
    }
  });

  menuItem.value = item;
  menuItem.value[0].isSelected = true;
  selectedItemId = '0';
  // note 有可能第一個就是下拉選單
  if(menuItem.value[0].subMenuItem) {
    menuItem.value[0].subMenuItem[0].isSelected = true;
    selectedItemId = '0-0';
  }
  return GetMenuItem();
}

/**
 * 取得全部選單資料
 * @returns 選單資料
 */
function GetMenuItem() {
  return menuItem.value;
}

/**
 * 透過id取得選單資料
 * @param {String} id 選單id
 * @returns 選單資料
 */
function GetItemById(id) {
  const idArray = separateId(id);
  return idArray.length === 1 ? menuItem.value[idArray[0]] : menuItem.value[idArray[0]].subMenuItem[idArray[1]];
}

/**
 * 取得目前選擇的選單資料
 * @returns 選單資料
 */
function GetItemNow() {
  const idArray = separateId(selectedItemId);
  return idArray.length === 1 ? menuItem.value[idArray[0]] : menuItem.value[idArray[0]].subMenuItem[idArray[1]];
}

/**
 * 展開選單
 * @param {String} id 選單id
 */
function ExpandItem(id) {
  const item = GetItemById(id);
  if(item.subMenuItem) {
    item.isExpanded = true;
  } else {
    throw new Error(`${id} does not have subMenuItem`);
  }
}

/**
 * 收合選單
 * @param {String} id 選單id
 */
function CollapseItem(id) {
  const item = GetItemById(id);
  if(item.subMenuItem) {
    item.isExpanded = false;
  } else {
    throw new Error(`${id} does not have subMenuItem`);
  }
}

/**
 * 選擇選單
 * @param {String} id 選單id
 * @returns 選單資料
 */
function SelectItem(id) {
  if(id === selectedItemId) return null;

  const oldIdArray = separateId(selectedItemId);
  const oldItem = GetItemNow();
  const idArray = separateId(id);
  if(idArray === null || idArray === undefined || idArray.length === 0) {
    throw new Error('id is invalid');
  }

  const findItem = GetItemById(id);
  if(findItem.subMenuItem) return null; // 下拉選單不會被選擇
  findItem.isSelected = true;
  oldItem.isSelected = false;
  
  if(oldIdArray.length > 1) {
    const parentItem = GetItemById(`${oldIdArray[0]}`);
    parentItem.isSelected = false;
    oldItem.isSelected = false;
  }
  if(idArray.length > 1) {
    const parentItem = GetItemById(`${idArray[0]}`);
    parentItem.isSelected = true;
  }
  
  selectedItemId = id;
  return GetItemNow();
}

export default { 
  Init,
  GetMenuItem,
  GetItemById,
  GetItemNow,
  ExpandItem,
  CollapseItem,
  SelectItem,
};
