import { dbConnect } from "./mongo";
import db from './mongo'

try {
   dbConnect().then(()=>{
    console.log('connected to mongodb')
   }).catch((error)=>{
    console.log(error.message)
   })

} catch (error) {
    console.log(error)
}

export const eventsCategories = db.collection('events-categories')
export const allEvents = db.collection('all-events')