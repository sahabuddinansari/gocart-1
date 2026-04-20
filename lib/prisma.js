
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { readReplicas } from '@prisma/extension-read-replicas';

// Create adapter for primary connection
const mainAdapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL
});

// Create adapter for replica connection
const replicaAdapter = new PrismaNeon({
  connectionString: process.env.DATABASE_REPLICA_URL
});

// Create replica client
const replicaClient = new PrismaClient({ adapter: replicaAdapter });
neonConfig.poolQueryViaFetch = true

// Create primary client and extend with read replicas
const prisma = new PrismaClient({ adapter: mainAdapter }).$extends(
  readReplicas({
    replicas: [replicaClient],
  })
);