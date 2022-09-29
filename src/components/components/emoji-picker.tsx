import EmojiPicker, { IEmojiData } from "emoji-picker-react";
import React from "react";
import { ListIconData } from "../../@types";

type Props = {
  onEmojiClick: (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiData: IEmojiData
  ) => void;
  onColorSetClick: (Icon: ListIconData) => void;
};

const EmojiSetPicker = ({ onEmojiClick }: Props) => {
  return (
    <div className="w-18 bg-slate-100 rounded-2xl">
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        disableSkinTonePicker={true}
        pickerStyle={{
          backgroundColor: "rgb(241, 245, 249)",
          boxShadow: "none",
          borderRadius: "1rem",
          paddingTop: "1rem",
          width: "18rem",
          height: "15rem",
        }}
      />
    </div>
  );
};

export default EmojiSetPicker;
