import Image from 'next/image'
import Link from 'next/link'
import Meta from '@/components/Meta/meta'
import styles from '@/styles/Events.module.sass'


export const getStaticProps = async(context)=>{

  let dev = process.env.NODE_ENV !== 'production'

  let {DEV_URL, PROD_URL} = process.env

  const data = await fetch(`${dev ? DEV_URL : PROD_URL}/api/events-categories`)
  const events_categories = await data.json()
 
  return {
    props: {
      data: events_categories
    }
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