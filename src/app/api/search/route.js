import { NextResponse } from "next/server";
import { Pool } from "pg";

const DB_CONN_STRING = process.env.DB_CONN_STRING;

const pool = new Pool({
    connectionString: DB_CONN_STRING,
    ssl: { rejectUnauthorized: false },
});

export async function POST(req) {
    try {
        const body = await req.json();
        const ids = body.ids;

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { error: "Invalid or missing ids" },
                { status: 400 }
            );
        }

        const query = `
            SELECT id, title, price, image, description, miscellaneous
            FROM products
            WHERE id = ANY($1)
            ORDER BY array_position($1, id);
    `;

        const { rows } = await pool.query(query, [ids]);

        const results = rows.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            description: item.description,
            miscellaneous: item.miscellaneous,
        }));

        return NextResponse.json({ results });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: error.message || "Unknown error" },
            { status: 500 }
        );
    }
}
