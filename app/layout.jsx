import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "DSC Pay - Digital Service Centre",
  description: "Digital Service Centre Full Stack Web Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
