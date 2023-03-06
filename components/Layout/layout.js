import Header from "../Header/header"
import Footer from "../Footer/footer"
import Meta from "../Meta/meta"
import styles from '@/styles/Layout.module.sass'
import {Barlow} from '@next/font/google'

const barlow = Barlow({
  weight: '400',
  subsets: ['latin'],
})

const Layout = ({children}) => {
  return (
    <>
    <Meta />
    <div className={barlow.className}>
    <Header />
      <main className={styles.main}>
        {children}
      </main>
    </div>
    <Footer />

    </>
  )
}

export default Layout