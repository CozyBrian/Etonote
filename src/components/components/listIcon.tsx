import React from "react";
import { ListIconData } from "../../@types";

type Props = {
  iconData: ListIconData;
};

const ListIcon = ({ iconData }: Props) => {
  return (
    <div>
      {iconData.type === "EMOJI" ? (
        <div className="h-6 w-6 bg-slate-60 rounded-md mr-3 mx-2 items-center text-md justify-center">
          {iconData.data}
        </div>
      ) : (
        <div>{iconData.data}</div>
      )}
    </div>
  );
};

export default ListIcon;
