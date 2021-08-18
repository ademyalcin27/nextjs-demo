import { MongoClient } from 'mongodb';

export default async function connectMongo() {
    const client = await MongoClient.connect('mongodb+srv://ademyalcin:d2XbqyKqNeWLXjNc@cluster0.exomg.mongodb.net/meetups?retryWrites=true&w=majority');        
    const db = client.db();
    
    const meetupsCollection = db.collection('meetups');
    return { client , meetupsCollection }
}