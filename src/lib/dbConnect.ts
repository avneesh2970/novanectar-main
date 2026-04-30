import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | null = null;

const DIRECT_CLUSTER_MAP: Record<
  string,
  {
    hosts: string[];
    params: Record<string, string>;
  }
> = {
  "cluster0.ge7kx.mongodb.net": {
    hosts: [
      "cluster0-shard-00-00.ge7kx.mongodb.net",
      "cluster0-shard-00-01.ge7kx.mongodb.net",
      "cluster0-shard-00-02.ge7kx.mongodb.net",
    ],
    params: {
      authSource: "admin",
      replicaSet: "atlas-rs4nz6-shard-0",
      tls: "true",
    },
  },
};

function normalizeMongoUri(uri: string) {
  if (!uri.startsWith("mongodb+srv://")) {
    return uri;
  }

  try {
    const parsed = new URL(uri);
    const directCluster = DIRECT_CLUSTER_MAP[parsed.hostname];

    if (!directCluster) {
      return uri;
    }

    const searchParams = new URLSearchParams(parsed.search);
    if (!searchParams.has("retryWrites")) {
      searchParams.set("retryWrites", "true");
    }
    if (!searchParams.has("w")) {
      searchParams.set("w", "majority");
    }

    Object.entries(directCluster.params).forEach(([key, value]) => {
      if (!searchParams.has(key)) {
        searchParams.set(key, value);
      }
    });

    const username = parsed.username ? encodeURIComponent(decodeURIComponent(parsed.username)) : "";
    const password = parsed.password ? encodeURIComponent(decodeURIComponent(parsed.password)) : "";
    const authPart = username ? `${username}${password ? `:${password}` : ""}@` : "";
    const databaseName = parsed.pathname.replace(/^\/+/, "") || "test";
    const hosts = directCluster.hosts.map((host) => `${host}:27017`).join(",");

    return `mongodb://${authPart}${hosts}/${databaseName}?${searchParams.toString()}`;
  } catch (error) {
    console.error("Failed to normalize MongoDB URI:", error);
    return uri;
  }
}

export const connectDB = async () => {
  const uri = normalizeMongoUri(process.env.NEXT_PUBLIC_MONGODB_URI || "");

  if (!uri) {
    throw new Error("MongoDB URI is not configured");
  }

  if (mongoose.connections[0]?.readyState) {
    return mongoose;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
  }

  try {
    await connectionPromise;
    return mongoose;
  } catch (error) {
    connectionPromise = null;
    throw error;
  }
};
