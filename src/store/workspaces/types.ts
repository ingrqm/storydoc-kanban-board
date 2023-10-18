export type Workspace = {
  id: string;
  title: string;
};

export type WorkspacesState = {
  value: Workspace[];
};

export type Element = {
  id: Workspace['id'];
  type: 'workspace';
};
