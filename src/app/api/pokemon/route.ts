import { IPokemon } from "@/app/models/pokemons/type";
import { NextResponse } from "next/server";

// Define Pokémon response type
interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[];
}

// Define detailed Pokémon type (adjust based on your needs)
interface PokemonDetail {
  types: { type: { name: string } }[];
}

// Cache revalidation every 60 seconds
export const revalidate = 60;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract and validate query params
    const limit = parseInt(searchParams.get("limit") || "24", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const offset = (page - 1) * limit; // Correct offset calculation
    const typeFilter = searchParams.get("type") || "";

    // Build base Pokémon list URL
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const listResponse = await fetch(apiUrl, { cache: "force-cache" });
    
    if (!listResponse.ok) {
      throw new Error("Failed to fetch Pokémon list");
    }

    const posts: PokemonListResponse = await listResponse.json();

    // Fetch detailed data for each Pokémon
    const detailedResults = await Promise.all(
      posts.results.map(async (item) => {
        const id = item.url.split("/").filter(Boolean).pop();
        const detailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`, {
          cache: "force-cache",
        });

        if (!detailResponse.ok) {
          throw new Error(`Failed to fetch details for ${item.name}`);
        }

        const detail: PokemonDetail = await detailResponse.json();

        return {
          ...item,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`,
          imageBack: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${id}.gif`,
          types: detail.types,
        };
      })
    );

    // Filter by type if provided (client-side filtering since API doesn’t support it)
    const filteredResults = typeFilter
      ? detailedResults.filter((pokemon) =>
          pokemon.types.some((t) => t.type.name === typeFilter)
        )
      : detailedResults;

    return NextResponse.json({
      count: posts.count,
      totalPage: Math.ceil(posts.count / limit), // Use dynamic limit
      results: filteredResults,
    });
  } catch (error) {
    console.error("Error in GET /pokemon:", error);
    return NextResponse.json(
      { error: "Failed to fetch Pokémon data" },
      { status: 500 }
    );
  }
}