
//import styles from '@/styles/Home.sass'
import HomePage from '@/components/Home/home-page'


export const getServerSideProps = async (context)=>{
  const {events_categories} = await import('/data/data.json');
  
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
