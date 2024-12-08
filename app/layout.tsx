import { AuthProvider } from "@/lib/components/Providers/AuthProvider";
import { ClientThemeProvider } from "@/lib/components/Providers/ClientThemeProvider";
import { QueryContextProvider } from "@/lib/components/Providers/QueryProvider";
import { ServerLocaleProvider } from "@/lib/components/Providers/ServerLocaleProvider";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>
          <ServerLocaleProvider>
            <AuthProvider>
              <QueryContextProvider>{props.children}</QueryContextProvider>
            </AuthProvider>
          </ServerLocaleProvider>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
