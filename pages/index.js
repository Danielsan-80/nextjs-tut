
//import styles from '@/styles/Home.sass'
import HomePage from '@/components/Home/home-page'

import { eventsCategories } from "@/db/events";

export const getServerSideProps = async (context)=>{

  try {
    const events_categories = await eventsCategories.find({}).toArray()

    return {
      props: {
        data: JSON.parse(JSON.stringify(events_categories)),
      }
    }

  } catch (error) {
    console.log(error)
  }
  
  
  
}

export default function Home({data}) {
  return (
    <>
    
      <HomePage data={data} />
     
    </>
  )
}
