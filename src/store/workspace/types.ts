import type { Workspace } from 'store/workspaces/types';

export type WorkspaceState = {
  value: Workspace['id'] | undefined;
};
