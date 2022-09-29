import React from "react";
import { ListIconData } from "../../@types";

type Props = {
  iconData: ListIconData;
};

const ListIcon = ({ iconData }: Props) => {
  return (
    <div>
      {iconData.type === "EMOJI" ? (
        <div>{iconData.data}</div>
      ) : (
        <div style={{ color: iconData.data }} className={`eton-icon`}>
          
        </div>
      )}
    </div>
  );
};

export default ListIcon;
