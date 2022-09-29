import React from "react";
import { ListIconData } from "../../@types";

type Props = {
  iconData: ListIconData;
  variant?: "fill" | "outline" | "outline-thick";
};

const ListIcon = ({ iconData, variant }: Props) => {
  return (
    <div>
      {iconData.type === "EMOJI" ? (
        <div>{iconData.data}</div>
      ) : (
        <div style={{ color: iconData.data }} className={`eton-icon mx-1`}>
          {variant === "fill" && ""}
          {variant === "outline" && ""}
          {variant === "outline-thick" && ""}
        </div>
      )}
    </div>
  );
};

export default ListIcon;
