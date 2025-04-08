import "next-auth";

declare module "next-auth" {
  export interface AdapterUser {
    id: string;
    name: string;
    avatar_url: string; 
  }

  export interface User {
    id: string;
    name: string;
    avatar_url: string; 
  }

  interface Session {
    user: User;
  }
}
