export interface CommonPost {
  id: number;
  title: string;
  text: string;
  user: CommonUser;
  isActive: boolean;
}

export interface CommonUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
