export interface IUser {
  readonly id: string;
  readonly emailAddress: string;
  readonly name: string;
  readonly createdDateTime: number;
  readonly updatedDateTime: number;
  readonly isArchived: boolean;
}
