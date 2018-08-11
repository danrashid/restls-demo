export interface IUser {
  readonly id: string;
  readonly emailAddress: string;
  readonly name: string;
  readonly created: number;
  readonly updated: number;
  readonly isArchived: boolean;
}
