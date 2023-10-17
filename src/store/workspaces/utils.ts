import type { Workspace, WorkspacesState } from './types';

export const saveState = (state: WorkspacesState) => {
  localStorage.setItem('workspaces', JSON.stringify(state.value));
};

export const readSavedState = () => {
  const storedWorkspaces = localStorage.getItem('workspaces');
  const isWorkspacesValid =
    storedWorkspaces && JSON.parse(storedWorkspaces).every((workspace: Workspace) => workspace.id && workspace.title);

  if (!isWorkspacesValid) {
    localStorage.removeItem('workspaces');
  }

  return isWorkspacesValid ? JSON.parse(storedWorkspaces) : [];
};
