import type { RefObject } from 'react';

export type WorkspaceProps = {
  id?: string;
  title?: string;
  letter?: string;
  saveButtonRef?: RefObject<HTMLButtonElement>;
  onWorkspaceTitleChange?: (title: string) => void;
  onWorkspaceAdd?: (title: string) => void;
  onWorkspaceCancelAdd?: () => void;
  onWorkspaceStartEdit?: () => void;
  onWorkspaceCancelEdit?: () => void;
  onWorkspaceEdit?: (title: string) => void;
  onWorkspaceDelete?: () => void;
  onWorkspaceSet?: () => void;
  isActive?: boolean;
};
