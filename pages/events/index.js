import Image from 'next/image'
import Link from 'next/link'
import Meta from '@/components/Meta/meta'
import styles from '@/styles/Events.module.sass'
import { eventsCategories } from '@/db/events'


export const getStaticProps = async(context)=>{

  try {

    const events_categories = await eventsCategories.find({}).toArray()

    return {
      props: {
        data: JSON.parse(JSON.stringify(events_categories))
      }
    }
    
  } catch (error) {
    
  }
 
  
}

const Events = ({data}) => {
  return (
    <>
    <Meta title="Events Page" description="This page lists all events" />
    <div>
      

      <div className={styles.events_page}>
        {data.map(event=>

          <Link legacyBehavior passHref href={`/events/${event.id}`} key={event.id}>
          <a className={styles.event_card}>

            <Image alt={event.title} width={250} height={250} src={event.image}/> 
 
            <h2>{event.title}</h2>
          </a>
          </Link>
          )}
      </div>
          

    </div>
    </>
  )
}

export default Events