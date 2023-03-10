import Image from 'next/image'
import styles from '@/styles/Event.module.sass'
import {useRef, useState} from 'react'
import { useRouter } from 'next/router'
import { allEvents } from '@/db/events'

export const getStaticProps = async(context)=>{

  const {id} = context?.params

  try {
    const event = await allEvents.findOne({id: id})

    const data = await JSON.parse(JSON.stringify(event))

  return {
    props: {data}
  }
  } catch (error) {
    console.log(error)
  }

  
}

export const getStaticPaths = async()=>{
  
 try {

  const all_events = await allEvents.find({}).toArray()
  //const all_events = await JSON.parse(JSON.stringify(res))

  const paths = all_events.map(event=> 
    {return {
      params: {
        cat: event.city.toString(),
        id: event.id.toString()
      }
    }
  })


  return {
    paths,
    fallback: false
  }


 } catch (error) {
    console.log(error)
 }
  

  
}




const Event = ({data}) => {
  
  // const handleSubmit = (e)=>{
  //   e.preventDefault()
  //   console.log(e.target.email.value)
  //   }
  const inputEmail = useRef()
  const router = useRouter()
  const [message, setMessage] = useState('')

  const handleSubmit = async (e)=>{
    e.preventDefault()
    
    const email = inputEmail.current.value
    const {id}= router?.query
    

    try {
      
      const res = await fetch(`/api/email-registration`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'Application/json'
        },
        body: JSON.stringify({email, id})
      })
      if(!res.ok) {
      const data = await res.json()
      setMessage(data.message)
      throw new Error(`Error: ${res.status} - ${res.statusText}`)
      }
      const data = await res.json()
      setMessage(data.message)
    } catch (error) {
      console.log(error.message)
    }

    }
    
  

  return (   
            <div className={styles.event_container}>
            <Image alt={data.title} width={700} height={400} src={data.image}/>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <form onSubmit={handleSubmit} className={styles.email_form} method="post">
            <label>Get Registered for this event:</label>
            <input type="text" id='email' ref={inputEmail} placeholder='Please insert your email'/>
            <button type="submit">Submit</button>
            </form>
            {message ?? <p>{message}</p>}
            </div>   
    
  )
}

export default Event