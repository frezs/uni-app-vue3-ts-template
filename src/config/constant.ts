export enum USER {
  Info = 'USER_INFO',
  Account = 'USER_ACCOUNT',
  Setting = "USER_SETTING",
  Token= "USER_TOKEN"
}

export enum TIME {
  HOUR_SECOND = 3600,
  DAY_HOUR = 24,
  DAY_SECOND = HOUR_SECOND * DAY_HOUR,
}

export enum APP {
  VERSION = '',
  ID = '',
}

export enum BOOT { 
  Info = "BOOT_INFO"
}

export enum ITEM {
  AddItem = 'ADD_ITEM'
}

export enum SEARCH {
  Item = 'SEARCH_ITEM'
}

export enum CASE_MODE {
  EDIT,
  DETAIL,
  CREATE,
  SIGN
}

export enum QR_MODE {
  CREATE,
  EDIT,
}


export enum LOCAL_DATA {
  ObLocalItems = 'OB_LOCAL_ITEMS'
}

export enum PAGE_EVENT {
  CustomPageInit = 'CUSTOM_PAGE_INIT',
  HiddenBtn = 'PAGE_EVENT_HiddenBtn',
  SetStorageUnitId = 'PAGE_EVENT_SetStorageUnitId'
}


