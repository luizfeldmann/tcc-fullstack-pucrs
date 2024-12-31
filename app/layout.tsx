import { AuthProvider } from "@/lib/components/Providers/AuthProvider";
import { ClientLocaleProvider } from "@/lib/components/Providers/ClientLocaleProvider";
import { ClientThemeProvider } from "@/lib/components/Providers/ClientThemeProvider";
import { QueryContextProvider } from "@/lib/components/Providers/QueryProvider";
import { useServerLocalization } from "@/lib/hooks/useServerLocalization";

export default function RootLayout(props: { children: React.ReactNode }) {
  /** Get the expected language from the request */
  const { locale } = useServerLocalization();

  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>
          <ClientLocaleProvider locale={locale}>
            <AuthProvider>
              <QueryContextProvider>{props.children}</QueryContextProvider>
            </AuthProvider>
          </ClientLocaleProvider>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
