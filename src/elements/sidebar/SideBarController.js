import { ref } from 'vue';

const content = ref(null);
// [
//   {
//     title: '首頁',
//     icon: 'fa-solid fa-check',
//     link: '/',
//   },
//   {
//     title: '基本元件',
//     icon: 'fa-solid fa-check',
//     subItems: [
//       { title: 'Button', icon: 'fa-solid fa-check', link: '/normal/button' },
//       { title: 'Checkbox', icon: 'fa-solid fa-check', link: '/normal/checkbox' },
//       { title: 'DatePicker', icon: 'fa-solid fa-check', link: '/normal/datepicker' },
//       { title: 'Input', icon: 'fa-solid fa-check', link: '/normal/input' },
//       { title: 'Select', icon: 'fa-solid fa-check', link: '/normal/select' },
//     ],
//   },
// ]

let isInit = false;
let selectedItemId = 0;
let isAutoExpand = false;

/**
 * 初始化sidebar
 * @param {array} _content 初始化sidebar的內容
 * @param {boolean} _isAutoExpand 如果設為true，selectItem會自動展開item的subItems。反之則需要透過ExpandItem和CollapseItem來展開和收合
 * @returns {array} 初始化後的內容
 */
function Init(_content, _isAutoExpand = false) {
  if(_content === null || _content === undefined) {
    throw new Error('content cannot be null or undefined');
  }
  if(isInit) return;

  _content.forEach((item, i) => {
    item.id = `${i}`;
    item.selected = false;
    if(item.subItems !== null && item.subItems !== undefined) {
      item.expanded = false;
      item.subItems.forEach((subItem, j) => {
        subItem.id = `${i}-${j}`;
        subItem.selected = false;
      });
    }
  });

  selectedItemId = '0';
  _content[0].selected = true;
  content.value = _content;
  isInit = true;
  isAutoExpand = _isAutoExpand;

  return content.value;
}

function separateId(id) {
  if(id === null || id === undefined) {
    throw new Error('id cannot be null or undefined');
  }

  const indexArray = id.split('-');
  indexArray.forEach((item, i) => {
    const parsedItem = parseInt(item);
    if(isNaN(parsedItem)) {
      throw new Error('id is invalid');
    }
    indexArray[i] = parsedItem;
  });
  return indexArray;
}

function isSameParent(id1, id2) {
  const indexArray1 = separateId(id1);
  const indexArray2 = separateId(id2);
  return indexArray1[0] === indexArray2[0];
}

/**
 * 取得所有sidebar的item
 * @returns {array} sidebar的item
 */
function GetContent() {
  return content.value;
}

/**
 * 用id取得sidebar的item
 * @param {string} id 取得item的id
 * @returns {object} 取得的item
 */
function GetContentById(id) {
  const indexArray = separateId(id);
  return indexArray.length === 1 ? content.value[indexArray[0]] : content.value[indexArray[0]].subItems[indexArray[1]];
}

/**
 * 用link取得sidebar的item
 * @param {string} link 取得item的link
 * @returns {object} 取得的item
 */
function GetContentByLink(link) {
  content.value.forEach(item => {
    if(item.link === link) {
      return item;
    }
    if(item.subItems !== null && item.subItems !== undefined) {
      item.subItems.forEach(subItem => {
        if(subItem.link === link) return subItem;
      });
    }
  });
  return null;
}

/**
 * 取得目前選擇的item
 * @returns {object} 目前選擇的item
 */
function GetContentNow() {
  const indexArray = separateId(selectedItemId);
  return indexArray.length === 1 ? content.value[indexArray[0]] : content.value[indexArray[0]].subItems[indexArray[1]];
}

/**
 * 選擇sidebar的item
 * @param {string} id 選擇的item的id
 * @returns {object} 選擇的item
 */
function SelectItem(id) {
  // Prevent selecting the same item
  if (id === selectedItemId) {
    return GetContentNow();
  }

  const oldItemArray = separateId(selectedItemId);
  const oldItem = GetContentNow();
  const newItemArray = separateId(id);
  const newItem = newItemArray.length === 1 ? content.value[newItemArray[0]] : content.value[newItemArray[0]].subItems[newItemArray[1]];
  
  // Always unselect old item
  oldItem.selected = false;
    
  // Collapse old item if it has subitems and not same parent as new item
  if (oldItem.subItems && !isSameParent(selectedItemId, id) && isAutoExpand) {
    oldItem.expanded = false;
  }
    
  // Handle old subitem's parent - only if not same parent as new item
  if (oldItemArray.length > 1 && !isSameParent(selectedItemId, id)) {
    const oldParent = content.value[oldItemArray[0]];
    oldParent.selected = false;
    if(isAutoExpand) oldParent.expanded = false;
  }

  // Select new item and expand if it has subitems
  newItem.selected = true;
  if (newItem.subItems && isAutoExpand) {
    newItem.expanded = true;
  }

  if(newItemArray.length > 1) {
    const newParent = content.value[newItemArray[0]];
    newParent.selected = true;
    if(isAutoExpand) newParent.expanded = true;
  }

  selectedItemId = id;
  return GetContentNow();
}

/**
 * 如果isAutoExpand為false，則展開item
 * @param {string} id 展開的item的id
 */
function ExpandItem(id) {
  if(isAutoExpand) return;
  const item = GetContentById(id);
  item.expanded = true;
}

/**
 * 如果isAutoExpand為false，則收合item
 * @param {string} id 收合的item的id
 */
function CollapseItem(id) {
  if(isAutoExpand) return;
  const item = GetContentById(id);
  item.expanded = false;
}

export default {
  Init,
  GetContent,
  GetContentById,
  GetContentByLink,
  GetContentNow,
  SelectItem,
  ExpandItem,
  CollapseItem,
};