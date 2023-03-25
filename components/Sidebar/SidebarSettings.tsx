import { ChatFolder, Conversation } from "@/types";
import { IconFileExport, IconMoon, IconSun } from "@tabler/icons-react";
import { FC } from "react";
import { ClearConversations } from "./ClearConversations";
import { Import } from "./Import";
import { Key } from "./Key";
import { BaseUrl } from "./BaseUrl";
import { SidebarButton } from "./SidebarButton";

interface Props {
  lightMode: "light" | "dark";
  apiKey: string;
  baseUrl: string;
  onToggleLightMode: (mode: "light" | "dark") => void;
  onApiKeyChange: (apiKey: string) => void;
  onBaseUrlChange: (baseUrl: string) => void;
  onClearConversations: () => void;
  onExportConversations: () => void;
  onImportConversations: (data: { conversations: Conversation[]; folders: ChatFolder[] }) => void;
}

export const SidebarSettings: FC<Props> = ({ lightMode, apiKey, baseUrl, onToggleLightMode, onApiKeyChange, onBaseUrlChange, onClearConversations, onExportConversations, onImportConversations }) => {
  return (
    <div className="flex flex-col pt-1 items-center border-t border-white/20 text-sm space-y-1">
      <ClearConversations onClearConversations={onClearConversations} />

      <Import onImport={onImportConversations} />

      <SidebarButton
        text="Export conversations"
        icon={<IconFileExport size={16} />}
        onClick={() => onExportConversations()}
      />

      <SidebarButton
        text={lightMode === "light" ? "Dark mode" : "Light mode"}
        icon={lightMode === "light" ? <IconMoon size={16} /> : <IconSun size={16} />}
        onClick={() => onToggleLightMode(lightMode === "light" ? "dark" : "light")}
      />
      
      <BaseUrl
        baseUrl={baseUrl}
        onBaseUrlChange={onBaseUrlChange}
      />

      <Key
        apiKey={apiKey}
        onApiKeyChange={onApiKeyChange}
      />

      
    </div>
  );
};
