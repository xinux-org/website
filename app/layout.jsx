import { Layout, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../styles.css'
import Logo from '../components/Logo'

const OG_IMAGE_URL = 'https://xinux.uz/og-image.jpg'

export const metadata = {
  metadataBase: new URL('https://xinux.uz'),
  title: {
    template: '%s – Xinux',
    default: 'Xinux Documentation Website',
  },
  description: "NixOS va Xinux haqida yozilgan yordamchi ma'lumot va qo'llanmalar.",
  openGraph: {
    images: [OG_IMAGE_URL],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE_URL],
  },
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()

  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="folderAsHeader cbs">
        <Layout
          navbar={<Navbar logo={<Logo />}><ThemeSwitch /></Navbar>}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/xinux-org/website"
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          toc={{ title: 'Ushbu sahifada', backToTop: "Yuqoriga qaytish" }}
          editLink="Ushbu sahifani GitHubʼda tahrirlash"
          search={<Search placeholder="Qidiruv..." />}
          feedback={{ content: null }}
          copyPageButton={false}
          footer={null}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
