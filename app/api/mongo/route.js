import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";



export async function GET(request) {
    const uri = "mongodb+srv://devampanchasara:devam@cluster0.fy63oxu.mongodb.net/";
    const client = new MongoClient(uri);
    // async function run() {
    try {
        const database = client.db('stock-managment');
        const movies = database.collection('stock');
        const query = {};
        const movie = await movies.findOne(query);
        return NextResponse.json({ a: "34", movie })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    // }
    // run().catch(console.dir);

    // return NextResponse.json({ a: "34" })
}