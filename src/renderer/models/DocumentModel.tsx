export type CreateDocument = {
  name: string;
  content: string;
  type: string;
  teamId: number;
  templateId: number;
};

export type AddContributorForm = {
  username: string;
  role: string;
  documentId: number;
  teamId: number;
};
