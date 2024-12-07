import { AuthProvider } from "@/lib/components/Providers/AuthProvider";
import { ClientThemeProvider } from "@/lib/components/Providers/ClientThemeProvider";
import { ServerLocaleProvider } from "@/lib/components/Providers/ServerLocaleProvider";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>
          <ServerLocaleProvider>
            <AuthProvider>{props.children}</AuthProvider>
          </ServerLocaleProvider>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
