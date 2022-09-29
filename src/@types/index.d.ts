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
