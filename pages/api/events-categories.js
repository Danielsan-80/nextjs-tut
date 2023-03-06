
import { eventsCategories } from "@/db/events";

export default async function handler(req, res) {
        const data = await eventsCategories.find().toArray()
        res.status(200).json(data)
}