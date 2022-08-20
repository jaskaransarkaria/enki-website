import fs from "fs";

export async function GET() {
  try {
    const data = fs.readFileSync("src/sitemap.xml", "utf8");
    return new Response(data, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (e) {
    return {
      body: "Error",
    };
  }
}
