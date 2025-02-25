import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export function MockSessionProvider({ children }: { children: ReactNode }) {
  return <SessionProvider session={null}>{children}</SessionProvider>;
}
