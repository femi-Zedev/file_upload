"use client"; // This is a client component 👈🏽
import { MantineProvider, createEmotionCache } from '@mantine/core'
import './globals.css'
import { RecoilRoot } from 'recoil';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const myCache = createEmotionCache({
    key: 'mantine',
    prepend: false
  });


  return (
    <html lang="en">
      <RecoilRoot>
        <MantineProvider withGlobalStyles withNormalizeCSS emotionCache={myCache}>
          <body className="">
            {children}
          </body>
        </MantineProvider>
      </RecoilRoot>
    </html>
  )
}
