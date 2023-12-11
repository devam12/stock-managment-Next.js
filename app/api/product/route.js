import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const uri = "mongodb+srv://devampanchasara:devam@cluster0.fy63oxu.mongodb.net/";
    const client = new MongoClient(uri);
    try {
        const database = client.db('stock-managment');
        const query = {};
        const stock = database.collection('stock');
        const products = await stock.find(query).toArray();
        return NextResponse.json({ products, ok:true })
    } finally {
        await client.close();
    }
}

export async function POST(request) {
    const body = await request.json();
    console.log(body);
    const uri = "mongodb+srv://devampanchasara:devam@cluster0.fy63oxu.mongodb.net/";
    const client = new MongoClient(uri );
    try {
        const database = client.db('stock-managment');
        const stock = database.collection('stock');
        const product = await stock.insertOne(body)
        return NextResponse.json({ product })
    } finally {
        await client.close();
    }
}