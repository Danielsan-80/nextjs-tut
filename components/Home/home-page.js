import Link from "next/link"
import Image from "next/image"
import styles from '@/styles/Home.module.sass'

const HomePage = ({data}) => {
  return (
    <div className={styles.home_body}>

        {data.map(event=>
        <Link legacyBehavior href={`/events/${event.id}`} key={event.id} passHref>
          <a className={styles.card}>
         
          <Image className={styles.image} alt={event.title} width={200} height={200} src={event.image}/> 
 
          <div className={styles.content}>
          <h2>{event.title}</h2> <p>{event.description}</p>
          </div>

          </a> 
        </Link>
        )}

      </div>

  )
}

export default HomePage