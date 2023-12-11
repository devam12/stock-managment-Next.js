import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const uri = "mongodb+srv://devampanchasara:devam@cluster0.fy63oxu.mongodb.net/";
    const client = new MongoClient(uri);

    const query = request.nextUrl.searchParams?.get("query");


    try {
        const database = client.db('stock-managment');
        const stock = database.collection('stock');

        const pipeline = [
            {
                $match: {
                    $or: [
                        { slug: { $regex: query, $options: 'i' } },
                    ],
                },
            },
        ];

        const products = await stock.aggregate(pipeline).toArray();
        return NextResponse.json({ products, ok: true })
    } finally {
        await client.close();
    }
}