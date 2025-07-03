import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(req, res) {
    if (req.method === 'POST') {
        const body = await req.json();
        const { firstName, email, message } = body
        console.log('this is the recieved body', body)
        console.log(process.env.GMAIL_USER, process.env.GMAIL_PASSWORD)
        if (!firstName|| !email|| !message) {
            return NextResponse.json({ message: 'fill out all fields please' }, { status: 404 })
        }

        const uri = process.env.URI
        const client = new MongoClient(uri)

        try {
            await client.connect();

            const database = client.db('message_db');

            const collection = database.collection('recieved_messages');

            await collection.insertOne({ firstName, email, message });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASSWORD
                }
            })

            const res = await transporter.sendMail({
                subject:'portfolio automated message',
                from: `porfolio contact from ${email} `,
                to: 'iansills04@gmail.com',
                html: `
                    <p><strong>From:</strong> ${firstName}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                    `
            })
            console.log(res.messageId)


            return NextResponse.json({ message: 'Data saved successfully!!!' });
        } catch (error) {
            return NextResponse.json({ message: 'SOMETHING WENT WRONG!' })
        }
    } else {
        NextResponse.json({ message: "METHOD IS NOT ALLOUD!!!" });
    }
};