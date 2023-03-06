
//import styles from '@/styles/Home.sass'
import HomePage from '@/components/Home/home-page'



export const getServerSideProps = async (context)=>{

  let dev = process.env.NODE_ENV !== 'production'

  let {DEV_URL, PROD_URL} = process.env

  const data = await fetch(`${dev ? DEV_URL : PROD_URL}/api/events-categories`)
  const events_categories = await data.json()
  
  
  return {
    props: {
      data: events_categories,
    }
  }
}

export default function Home({data}) {
  return (
    <>
    
      <HomePage data={data} />
     
    </>
  )
}
