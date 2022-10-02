import EmojiPicker, { IEmojiData } from "emoji-picker-react";
import React, { useState } from "react";
import { ListIconData } from "../../@types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AnimatePresence, motion } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import pickTextColorBasedOnBgColor from "../../utils/textColor";
import { action } from "../../redux";

type Props = {
  onEmojiClick: (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiData: IEmojiData
  ) => void;
  onColorSetClick: (Icon: ListIconData) => void;
};

const EmojiSetPicker = ({ onEmojiClick, onColorSetClick }: Props) => {
  const global = useAppSelector((state) => state.system);
  const [selectedTab, setSelectedTab] = useState("COLOR");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const dispatch = useAppDispatch();

  const user_colors = global.userColors;

  const colors = [
    "#FFB100",
    "#56494C",
    "#00AF54",
    "#3CBBB1",
    "#007CBE",
    "#5E7CE2",
    "#CFDEE7",
    ...user_colors,
  ];

  const handleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
    if (isColorPickerOpen) {
      dispatch(action.system.setColor(selectedColor));
    }
  };

  return (
    <motion.div className="border dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 shadow-sm backdrop-blur-md rounded-2xl duration-200">
      <div className="flex flex-row w-full p-2 gap-1">
        <div
          onClick={() => setSelectedTab("COLOR")}
          className={`px-2 py-1 text-sm rounded-md hover:bg-gray-200/70 dark:hover:bg-zinc-800/90 active:bg-gray-300 dark:text-slate-50 ${
            selectedTab === "COLOR" && "bg-gray-200 dark:bg-zinc-700/50"
          }`}
        >
          Colors
        </div>
        <div
          onClick={() => setSelectedTab("EMOJI")}
          className={`px-2 py-1 text-sm rounded-md hover:bg-gray-200/70 dark:hover:bg-zinc-800/90 active:bg-gray-300 dark:text-slate-50 ${
            selectedTab === "EMOJI" && "bg-gray-200 dark:bg-zinc-700/50"
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
                backgroundColor:
                  global.THEME === "Dark"
                    ? "rgb(24 24 27 / 0.9)"
                    : "rgba(255, 255, 255, 0.6)",
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
            className="relative justify-center p-2 w-[286px]"
          >
            <div className="grid grid-cols-7">
              {colors.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedColor(item);
                    onColorSetClick({ type: "COLOR", data: item });
                  }}
                  className="flex items-center justify-center w-9 h-9 p-1 rounded-md hover:bg-slate-200 dark:hover:bg-zinc-700 active:bg-slate-300"
                >
                  <div style={{ color: item }} className={`eton-icon text-2xl`}>
                    
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-2 text-sm flex flex-row justify-between items-center dark:text-slate-50">
              <div>Custom color:</div>
              <div
                onClick={handleColorPicker}
                style={{
                  backgroundColor: selectedColor,
                  color: pickTextColorBasedOnBgColor(
                    selectedColor,
                    "#fff",
                    "#000"
                  ),
                }}
                className="flex items-center justify-center w-[70px] h-7 px-1 py-0.5 rounded-md border bg-gray-300 dark:bg-zinc-700"
              >
                {selectedColor}
              </div>
            </div>
            {isColorPickerOpen && (
              <div className=" flex color-picker absolute h-48 p-2 -right-[14rem] -top-10 border dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 shadow-sm backdrop-blur-md rounded-2xl duration-200">
                <HexColorPicker
                  className="flex-row"
                  color={selectedColor}
                  onChange={setSelectedColor}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmojiSetPicker;
