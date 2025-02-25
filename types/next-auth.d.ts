import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email?: string | null;
      image?: string | null;
      role: string;
      roleId: string;
    };
  }

  interface JWT {
    id: string;
    role: "ADMIN" | "USER";
  }
}
