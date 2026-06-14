import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Topbar title="Home" />

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
