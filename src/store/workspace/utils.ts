import type { Workspace } from 'store/workspaces/types';

import type { WorkspaceState } from './types';

export const saveState = (state: WorkspaceState) => {
  localStorage.setItem('workspace', JSON.stringify(state.value));
};

export const readSavedState = () => {
  const storedWorkspace = localStorage.getItem('workspace');
  const storedWorkspaces = localStorage.getItem('workspaces');

  const isWorkspaceValid =
    storedWorkspaces &&
    storedWorkspace &&
    JSON.parse(storedWorkspaces).find((workspace: Workspace) => workspace.id === JSON.parse(storedWorkspace));

  if (!isWorkspaceValid) {
    localStorage.removeItem('workspace');
  }

  return isWorkspaceValid ? JSON.parse(storedWorkspace) : undefined;
};
