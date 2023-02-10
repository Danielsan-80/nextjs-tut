import Image from 'next/image'
import Link from 'next/link'
import Meta from '@/components/Meta/meta'
import styles from '@/styles/CityEvents.module.sass'
import { useRouter } from 'next/router'

export const getStaticProps = async(context)=>{
  const id = context?.params.cat
  const {allEvents} = await import('/data/data.json')

  const data = allEvents.filter(event=> event.city === id)

  return {
    props: {data, pageName: id }
  }
}


export const getStaticPaths = async(context)=>{

  const {events_categories} = await import('/data/data.json')
  const paths = events_categories.map(event => {
    return {
      params: {
        cat: event.id.toString()
      }
    }
  })

  return {
    paths,
    fallback: false
  }

}

const Cat = ({data, pageName}) => {

  const router = useRouter()
  const {cat} = router.query
  console.log(cat)
  
  const eventCityArr = pageName.split('-');
  const eventCityCapitalized = eventCityArr.map(city => city[0].toUpperCase() + city.substring(1)).toString()
  const eventCity = eventCityCapitalized.replace(',', ' ')

  return (
    <>
    <Meta title={`Events in ${eventCity}`} keywords={`travel, events, ${eventCity}`} description={`This page lists all the events in ${eventCity}`}/>
    <div className={styles.cat_container}>
        
        <h1>Events in {eventCity}</h1>

        <div className={styles.cat_events}>
        {data.map(event=>(

          <Link legacyBehavior href={`/events/${event.city}/${event.id}`} key={event.id} passHref>
          <a className={styles.card}>

          <Image alt={event.title} width={250} height={250} src={event.image}/>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </a>
          </Link>
        ))}

      </div>
    </div>
    </>
  )
}

export default Cat