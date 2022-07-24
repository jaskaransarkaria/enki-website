import fs from "fs";

export async function GET() {
  try {
    const data = fs.readFileSync("src/sitemap.xml", "utf8");

    return {
      headers: {
        "Content-Type": "application/xml",
      },
      body: data,
    };
  } catch (e) {
    return {
      body: "Error",
    };
  }
}
