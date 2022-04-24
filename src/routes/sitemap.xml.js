import fs from "fs";

export async function get() {
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
