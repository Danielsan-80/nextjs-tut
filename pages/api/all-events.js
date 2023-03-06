
import { allEvents } from "@/db/events";

export default async function handler(req, res) {
        const data = await allEvents.find().toArray()
        res.status(200).json(data)
}