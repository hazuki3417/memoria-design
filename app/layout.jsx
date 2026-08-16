import { Head } from "nextra/components"
import { getPageMap } from "nextra/page-map"
import { Footer, Layout, Navbar } from "nextra-theme-docs"
import "nextra-theme-docs/style.css"

export const metadata = {
  title: {
    default: "Memoria",
    template: "%s – Memoria",
  },
  description: "Memoriaのプロダクト設計と開発ガイド",
}

const navbar = <Navbar logo={<strong>Memoria</strong>} />
const footer = <Footer>Memoria</Footer>

export default async function RootLayout({ children }) {
  return (
    <html lang="ja" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/hazuki3417/memoria-design/tree/develop/content"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
