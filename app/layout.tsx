import Navbar from '@/Components/Navbar'
import './globals.css'
import Footer from '@/Components/Footer'


export const metadata = {
  title: "Flexible",
  description: 'Showcase and discover remarcable developer projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main>
        {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
