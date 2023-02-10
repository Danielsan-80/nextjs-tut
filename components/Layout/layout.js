import Header from "../Header/header"
import Footer from "../Footer/footer"
import Meta from "../Meta/meta"
import styles from '@/styles/Layout.module.sass'

const Layout = ({children}) => {
  return (
    <>
    <Meta />
    <Header />
      <main className={styles.main}>
        {children}
      </main>
    <Footer />

    </>
  )
}

export default Layout