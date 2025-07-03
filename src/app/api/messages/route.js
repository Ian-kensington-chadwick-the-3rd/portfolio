import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(req, res) {

        try {
            const body = await req.json();
            const { firstName, email, message } = body;
            
            // Skip MongoDB for now
            console.log('📧 Sending email only...');
            
            const transporter = nodemailer.createTransporter({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASSWORD
                }
            });
    
            await transporter.sendMail({
                subject: 'Test Email',
                from: process.env.GMAIL_USER,
                to: 'iansills04@gmail.com',
                html: `<p>Test from ${firstName}: ${message}</p>`
            });
    
            return NextResponse.json({ message: 'Email sent (no database)' });
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    
};    
// console.log('api route used')
    //     const body = await req.json();
    //     const { firstName, email, message } = body
    //     console.log(firstName, email, message)
    //     if (!firstName|| !email|| !message) {
    //         return NextResponse.json({ message: 'fill out all fields please' }, { status: 404 })
    //     }

    //     const uri = process.env.URI
    //     console.log("this is uri==>",uri)
    //     const client = new MongoClient(uri,{
    //         connectTimeoutMS: 10000,
    //         serverSelectionTimeoutMS: 5000,
    //         ssl: true,
    //         tlsAllowInvalidCertificates: true,
    //         retryWrites: true
    //     })
    //     console.log('this is client==>', client)
    //     try {
    //         await client.connect();

    //         const database = client.db('message_db');

    //         const collection = database.collection('recieved_messages');

    //         const result = await collection.insertOne({ firstName, email, message, timestamp: new Date(),
    //         });

    //         console.log('this is result===>',result)

    //         const transporter = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //                 user: process.env.GMAIL_USER,
    //                 pass: process.env.GMAIL_PASSWORD
    //             }
    //         })

    //         await transporter.sendMail({
    //             subject:'portfolio automated message',
    //             from: `porfolio contact from ${email} `,
    //             to: 'iansills04@gmail.com',
    //             html: `
    //                 <p><strong>From:</strong> ${firstName}</p>
    //                 <p><strong>Message:</strong></p>
    //                 <p>${message}</p>
    //                 `
    //         })

    //         return NextResponse.json({ message: 'Data saved successfully!!!' });
    //     } catch (error) {
    //         return NextResponse.json({ message: `SOMETHING WENT WRONG! ${error}`})
    //     } finally {
    //         await client.close();
    //     }