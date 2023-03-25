import { IconCheck, IconKey, IconX } from "@tabler/icons-react";
import { FC, KeyboardEvent, useState } from "react";
import { SidebarButton } from "./SidebarButton";

interface Props {
  baseUrl: string;
  onBaseUrlChange: (baseUrl: string) => void;
}

export const BaseUrl: FC<Props> = ({ baseUrl, onBaseUrlChange }) => {
  const [isChanging, setIsChanging] = useState(false);
  const [url, setUrl] = useState(baseUrl);

  const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdateKey(url);
    }
  };

  const handleUpdateKey = (url: string) => {
    onBaseUrlChange(url.trim());
    setIsChanging(false);
  };

  return isChanging ? (
    <div className="flex transition-colors duration:200 hover:bg-gray-500/10 py-3 px-3 rounded-md cursor-pointer w-full items-center">
      <IconKey size={16} />

      <input
        className="ml-2 flex-1 h-[20px] bg-transparent border-b border-neutral-400 focus:border-neutral-100 text-left overflow-hidden overflow-ellipsis pr-1 outline-none text-white"
        type="password"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleEnterDown}
      />

      <div className="flex w-[40px]">
        <IconCheck
          className="ml-auto min-w-[20px] text-neutral-400 hover:text-neutral-100"
          size={18}
          onClick={(e) => {
            e.stopPropagation();
            handleUpdateKey(url);
          }}
        />

        <IconX
          className="ml-auto min-w-[20px] text-neutral-400 hover:text-neutral-100"
          size={18}
          onClick={(e) => {
            e.stopPropagation();
            setIsChanging(false);
            setUrl(baseUrl);
          }}
        />
      </div>
    </div>
  ) : (
    <SidebarButton
      text="Api Base Url"
      icon={<IconKey size={16} />}
      onClick={() => setIsChanging(true)}
    />
  );
};
