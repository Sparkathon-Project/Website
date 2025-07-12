import { NextResponse } from "next/server";
import { mockProducts } from "@/app/mock-data";

export async function POST(req) {
  try {
    const body = await req.json();
    const query = body.query;

    if (!query) {
      return NextResponse.json(
        { error: "Invalid or missing query" },
        { status: 400 }
      );
    }

    const lowerCaseQuery = query.toLowerCase();
    const matchingProducts = mockProducts.filter(product => {
      return (
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery) ||
        product.materials.toLowerCase().includes(lowerCaseQuery) ||
        product.styleEra.toLowerCase().includes(lowerCaseQuery) ||
        product.origin.toLowerCase().includes(lowerCaseQuery)
      );
    });

    // const ids = matchingProducts.map(product => product.id);

    return NextResponse.json({ matchingProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}