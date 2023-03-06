
import { allEvents } from "@/db/events"

export default async function handler(req, res) {
    // req.method==='POST' ? 
    //     res.json({result: 'success'})
    //     :
    //     res.json({error: 'wrong'})

    const {method} = req

    if (method ==='POST'){ 
    const {email, id} = req.body

    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    
    
    if(!email || !email.match(validEmail)){
        
        return res.status(422).json({message: 'invalid email address'})
    }

    //retrieve event from database and check if mail exists

    const event = await allEvents.findOne({id: id})
    const emailExists = event.emails_registered.includes(email)

    if(emailExists) {
        return res.status(409).json({message: 'mail already registered'})
    }
    
    //update the event
    await allEvents.updateOne({id: id}, {
        $push: {'emails_registered':email}
    })

    
    res.status(201).json({message: `Congratulations ! You've been registered with the email: ${email} for the event: ${event.title}`})}
    
}