import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  console.log("🗑️ Clearing all data from database...");

  // Delete all materials
  const materialsResult = await sql`DELETE FROM materials`;
  console.log("✅ Deleted all materials");

  // Delete all sessions
  const sessionsResult = await sql`DELETE FROM sessions`;
  console.log("✅ Deleted all sessions");

  // Delete all courses
  const coursesResult = await sql`DELETE FROM courses`;
  console.log("✅ Deleted all courses");

  console.log("🎉 Database cleared successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Failed to clear database:", err);
  process.exit(1);
});
