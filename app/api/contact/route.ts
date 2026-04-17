import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = "3c5f0d37d11c4d8896dd3885f3da4ffa";

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, telefono, pais } = await req.json();

    console.log("API contact llamada");
    console.log("Contact API called", { nombre, email, telefono, pais });

    await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Nombre: {
          title: [{ text: { content: nombre ?? "" } }],
        },
        Email: {
          email: email ?? null,
        },
        Teléfono: {
          phone_number: telefono ?? null,
        },
        País: {
          rich_text: [{ text: { content: pais ?? "" } }],
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Notion error:", error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
