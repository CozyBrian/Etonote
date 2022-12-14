export declare type SidebarItem = {
  id: string;
  title: string;
  icon: ListIconData;
};

export declare type taskItem = {
  id?: string;
  listID: string;
  title: string;
  isDone: boolean;
  icon: ListIconData;
};

export declare type ListIconData = {
  type: "EMOJI" | "COLOR";
  data: string;
};

export interface app_state {
  selectedTab: string;
  homeId: string;
  isSplash: boolean;
  showSettingsPanel: boolean;
  selectedSettingsTab: string;
  showAddEditPanel: boolean;
  addEditPanelMode: "ADD" | "EDIT";
  addEditPanelData: string | null;
}

export interface system_state {
  THEME: string;
  userColors: string[];
}

export interface todoList {
  value: SidebarItem[];
}

export interface todosList {
  value: taskItem[];
}

export interface user_state {
  user_id: string | null;
  userName: string | null;
  userEmail: string | null;
}

export interface cloud_state {
  system: system_state;
  lists: todoList;
  todos: todosList;
}
