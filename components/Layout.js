import Head from "next/head";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/data";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>{`${SITE.name} · ${SITE.role}`}</title>
        <meta
          name="description"
          content={SITE.tagline}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Nav />
      <main className="page-main">{children}</main>
      <Footer />
    </>
  );
}
