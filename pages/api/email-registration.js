import path from 'path'
import fs from 'fs'


const buildPath = ()=>{
    return path.join(process.cwd(), 'data', 'data.json')
}

const extractData = (filePath)=> {
    const jsonData = fs.readFileSync(filePath)
    return JSON.parse(jsonData)
}


export default function handler(req, res) {
    // req.method==='POST' ? 
    //     res.json({result: 'success'})
    //     :
    //     res.json({error: 'wrong'})

    const {method} = req


    //access data.json
    const filePath = buildPath()
    //extract the data "AllEvents"
    const {events_categories, allEvents} = extractData(filePath)

    // res.status = 404 if no events are found
    if(!allEvents) {
        res.status(404).json({message: 'Events not found'})

    }

    if (method ==='POST'){ 
    const {email, id} = req.body

    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    
    
    if(!email || !email.match(validEmail)){
        return res.status(422).json({message: 'invalid email address'})
    }

    const allEventsUpdated = allEvents.map(event=> {

        //loop and identify the event id
        if(event.id === id) {

            //add the email of the user to array "email_registered", only if that email doesnt exist yet
            if(event.emails_registered.includes(email)) {
                
                res.status(409).json({message: 'email already registered'})
                return event
            }

            return {
                ...event,
                emails_registered: [...event.emails_registered, email]
            }
        }

        return event

        })
    
    //update the data.json file
    fs.writeFileSync(filePath, JSON.stringify({events_categories, allEvents: allEventsUpdated}))

    const event = id.replaceAll('-', ' ')
    
    res.status(201).json({message: `Congratulations ! You've been registered with the email: ${email} for the event: ${event}`})}



    
}