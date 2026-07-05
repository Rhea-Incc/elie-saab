import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navigation } from "@/components/couture/Navigation";
import { Footer } from "@/components/couture/Footer";
import { AtelierCursor } from "@/components/couture/Cursor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-ivory px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow">Not found</p>
        <h1 className="mt-6 font-display text-6xl font-light italic text-charcoal">404</h1>
        <p className="mt-6 text-sm text-stone">This page has slipped between the folds. Return to the maison.</p>
        <Link
          to="/"
          className="mt-10 inline-block border-b border-charcoal pb-1 text-[10px] uppercase tracking-[0.32em] text-charcoal hover:text-bronze"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-ivory px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow">A moment</p>
        <h1 className="mt-6 font-display text-4xl font-light italic text-charcoal">
          This page did not settle.
        </h1>
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-charcoal/70 px-6 py-3 text-[10px] uppercase tracking-[0.32em] hover:border-bronze hover:text-bronze"
          >
            Try again
          </button>
          <a href="/" className="border-b border-charcoal pb-1 text-[10px] uppercase tracking-[0.32em] hover:text-bronze">
            Return home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Elie Saab Residences — Living Couture" },
      {
        name: "description",
        content:
          "A private residential maison where architecture is tailored with the precision of haute couture and the permanence of timeless craftsmanship.",
      },
      { name: "author", content: "Elie Saab Residences" },
      { property: "og:title", content: "Elie Saab Residences — Living Couture" },
      {
        property: "og:description",
        content:
          "Architecture shaped with the elegance of haute couture. A private residential maison.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#F8F6F2" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-ivory text-charcoal antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AtelierCursor />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
