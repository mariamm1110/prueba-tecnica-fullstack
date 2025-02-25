import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import SideBarMenu from "@/components/ui/atomic-design/organisms/SidebarMenu-scn";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

// Mock session provider
const MockSessionProvider = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider session={null}>{children}</SessionProvider>
);

describe("Sidebar Menu", () => {
  it("renders menu items correctly", async () => {
    render(
      <MockSessionProvider>
        <SidebarProvider>
          <SideBarMenu />
        </SidebarProvider>
      </MockSessionProvider>
    );

    expect(await screen.findByText(/Ingresos y Registros/i)).toBeTruthy();
    expect(await screen.findByText(/Usuarios/i)).toBeTruthy();
    expect(await screen.findByText(/Reportes/i)).toBeTruthy();
  });

  it("should have accessible menu items", async () => {
    render(
      <MockSessionProvider>
        <SidebarProvider>
          <SideBarMenu />
        </SidebarProvider>
      </MockSessionProvider>
    );

    // Check if buttons are accessible
    expect(await screen.findByRole("link", { name: /Ingresos y Registros/i })).toBeTruthy();
    expect(await screen.findByRole("link", { name: /Usuarios/i })).toBeTruthy();
    expect(await screen.findByRole("link", { name: /Reportes/i })).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <MockSessionProvider>
        <SidebarProvider>
          <SideBarMenu />
        </SidebarProvider>
      </MockSessionProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
