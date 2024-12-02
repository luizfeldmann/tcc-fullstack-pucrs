import { ClientThemeProvider } from "@/lib/components/Providers/ClientThemeProvider";
import { ServerLocaleProvider } from "@/lib/components/Providers/ServerLocaleProvider";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>
          <ServerLocaleProvider>{props.children}</ServerLocaleProvider>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
