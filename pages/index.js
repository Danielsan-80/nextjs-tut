
//import styles from '@/styles/Home.sass'
import HomePage from '@/components/Home/home-page'



export const getServerSideProps = async (context)=>{
  const data = await fetch('http://localhost:3000/api/events-categories')
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
