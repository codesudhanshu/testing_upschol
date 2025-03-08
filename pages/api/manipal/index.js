import dbConnect from "../../../dbConnect";
import manipalModel from '../../../model/manipalModel';

export default async function handler(req, res) {
    await dbConnect(); 

    if (req.method === 'POST') {
        try {
            const { name, email, phoneNumber,  location } = req.body;

            if (!name || !email || !phoneNumber || !location) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            const newEntry = new manipalModel({
                name,
                email,
                phoneNumber,
                location
            });

            await newEntry.save();
            return res.status(201).json({ success: true, message: 'Data saved successfully' });

        } catch (error) {
            return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
