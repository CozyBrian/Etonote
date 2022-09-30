import React from "react";
import { action } from "../../../redux";
import { useAppDispatch, useAppSelector } from "../../../hooks";

type Props = {
  tabs: { id: string; title: string }[];
};

const MainSettings = ({ tabs }: Props) => {
  const appState = useAppSelector((state) => state.app);

  const selectedTab = tabs.find(
    (tab) => tab.id === appState.selectedSettingsTab
  );

  return (
    <div className="flex w-full h-full flex-col p-2">
      <div className="text-2xl font-semibold pb-1">{selectedTab?.title}</div>
      {selectedTab?.id === tabs[0].id && <Personal />}
      {selectedTab?.id === tabs[1].id && <Appearance />}
      {selectedTab?.id === tabs[2].id && <Shortcuts />}
      {selectedTab?.id === tabs[3].id && <Misc />}
    </div>
  );
};

const Personal = () => {
  return <div>a</div>;
};

const Appearance = () => {
  const dispatch = useAppDispatch();
  const setTheme = (theme: string) => {
    console.log(theme);

    return dispatch(action.system.setTheme(theme));
  };

  const themes = [{ title: "Light" }, { title: "Dark" }];

  return (
    <div className="flex flex-col h-full w-full">
      <div className="text-xl font-normal text-gray-700 dark:text-gray-300 pb-1">
        Theme
      </div>
      <div className="flex flex-row w-full gap-4">
        {themes.map((theme, i) => (
          <div
            key={i}
            onClick={() => setTheme(theme.title)}
            className="active:scale-95 duration-100"
          >
            <div className="w-[200px] h-[150px] rounded-lg bg-slate-300 dark:bg-slate-700"></div>
            {theme.title}
          </div>
        ))}
      </div>
    </div>
  );
};

const Shortcuts = () => {
  return <div>i</div>;
};
const Misc = () => {
  return <div>o</div>;
};

export default MainSettings;
