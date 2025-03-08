import dbConnect from "../../../dbConnect";
import amityModel from '../../../model/amityModel';

export default async function handler(req, res) {
    await dbConnect(); 

    if (req.method === 'POST') {
        try {
            const { first_name, last_name, email, phoneNumber, course, location } = req.body;

            if (!first_name || !last_name || !email || !phoneNumber || !course || !location) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            const newEntry = new amityModel({
                first_name,
                last_name,
                email,
                phoneNumber,
                course,
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
