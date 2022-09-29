import EmojiPicker, { IEmojiData } from "emoji-picker-react";
import React, { useState } from "react";
import { ListIconData } from "../../@types";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  onEmojiClick: (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiData: IEmojiData
  ) => void;
  onColorSetClick: (Icon: ListIconData) => void;
};

const EmojiSetPicker = ({ onEmojiClick, onColorSetClick }: Props) => {
  const [selectedTab, setSelectedTab] = useState("COLOR");
  const [selectedColor, setSelectedColor] = useState("");

  const colors = [
    "#003844",
    "#FFB100",
    "#F194B4",
    "#56494C",
    "#7CAE7A",
    "#007CBE",
    "#00AF54",
    "#3CBBB1",
    "#0A369D",
    "#4472CA",
    "#5E7CE2",
    "#92B4F4",
    "#CFDEE7",
  ];
  return (
    <motion.div className="border bg-white shadow-sm rounded-2xl duration-200">
      <div className="flex flex-row w-full p-2 gap-1">
        <div
          onClick={() => setSelectedTab("COLOR")}
          className={`px-2 py-1 text-sm rounded-md hover:bg-gray-200/70 active:bg-gray-300 ${
            selectedTab === "COLOR" && "bg-gray-200"
          }`}
        >
          Colors
        </div>
        <div
          onClick={() => setSelectedTab("EMOJI")}
          className={`px-2 py-1 text-sm rounded-md hover:bg-gray-200/70 active:bg-gray-300 ${
            selectedTab === "EMOJI" && "bg-gray-200"
          }`}
        >
          Emoji
        </div>
      </div>
      <AnimatePresence>
        {selectedTab === "EMOJI" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" justify-center p-2"
          >
            <div className="grid grid-cols-7">
              {colors.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSelectedColor(item);
                    onColorSetClick({ type: "COLOR", data: item });
                  }}
                  className="flex items-center justify-center w-9 h-9 p-1 rounded-md hover:bg-slate-200 active:bg-slate-300"
                >
                  <div style={{ color: item }} className={`eton-icon text-2xl`}>
                    
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-2 text-sm flex flex-row justify-between items-center">
              <div>Custom color:</div>
              <div className="w-[70px] h-7 px-1 py-0.5 rounded-md bg-gray-200">
                {selectedColor}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmojiSetPicker;
