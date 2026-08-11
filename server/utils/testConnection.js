// Standalone connectivity check — run with: node utils/testConnection.js
// Useful for confirming your IP is whitelisted / credentials are correct
// without booting the whole Express app.
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("MONGO_URI is not set in your .env file.");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    const dbName = process.env.MONGO_DB_NAME || "wanderlust";
    const collections = await client.db(dbName).listCollections().toArray();
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
    console.log(`📂 Target database: "${dbName}"`);
    if (collections.length) {
      console.log("📋 Existing collections (tables):");
      collections.forEach((c) => console.log(`   • ${c.name}`));
    } else {
      console.log("📋 No collections yet — run 'npm run seed' to create and populate them.");
    }
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    if (err.message.includes("whitelist") || err.message.includes("Could not connect")) {
      console.error(
        "\nFix: Atlas dashboard → Network Access → Add IP Address → 'Add Current IP Address'\n" +
          "(or 'Allow Access From Anywhere' for local dev), wait for it to show Active, then re-run this script."
      );
    }
  } finally {
    await client.close();
  }
}

run();
