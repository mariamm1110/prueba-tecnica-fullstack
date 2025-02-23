import { prisma } from "@/lib/prisma";
import { AuthData, Context } from "@/types/index";

export async function createContext(req?: any): Promise<Context> {
    // Extract user from request (if applicable)
    const authData: AuthData = req?.user ?? { id: "", role: "USER" };
  
    return { 
      db: prisma,  // ✅ Ensure Prisma is available
      authData
    };
  }
