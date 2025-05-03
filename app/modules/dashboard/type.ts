export type TUserMeResponse = {
  id: string;
  username: string;
};
export type TQuestionResponse = {
  id: string;
  question: string;
  userId: string;
  name: string;
  createAt: string;
  isViewed: boolean | null;
};
export type TDataDashboardResponse = {
  totalQuestion: number
}
