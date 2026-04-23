import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'
import ws from 'ws'
import { neonConfig } from '@neondatabase/serverless'

neonConfig.webSocketConstructor = ws
neonConfig.poolQueryViaFetch = true

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaNeon(pool)

const globalForPrisma = global

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma;