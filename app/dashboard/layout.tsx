import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { getMeAction } from "./action/action-dashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMeAction();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Sidebar activeRoute="dashboard" />

      {/* Conteúdo principal */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Topbar title="Home" username={user.username} />

        <main
          style={{
            flex: 1,
            overflow: "auto",
            background: "var(--bg)",
          }}
        >
          <div
            style={{
              padding: "32px 40px 60px",
              maxWidth: 1240,
              margin: "0 auto",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
