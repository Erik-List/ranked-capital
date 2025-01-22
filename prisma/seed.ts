import { PrismaClient, ApprovalStatus, LogType } from '@prisma/client'
import { User, Investor, Rating, Log } from '@/prisma/types'
import { mockUsers, mockInvestors, mockRatings, mockLogs } from '@/lib/mock-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clear existing data
  await prisma.log.deleteMany({})
  await prisma.rating.deleteMany({})
  await prisma.investor.deleteMany({})
  await prisma.user.deleteMany({})

  // Seed Users
  console.log('Seeding users...')
  await Promise.all(
    mockUsers.map((user: User) =>
      prisma.user.create({
        data: {
          id: user.id,
          linkedin_url: user.linkedin_url,
          created_at: new Date(user.created_at),
          updated_at: new Date(user.updated_at)
        }
      })
    )
  )

  // Seed Investors
  console.log('Seeding investors...')
  await Promise.all(
    mockInvestors.map((investor: Investor) =>
      prisma.investor.create({
        data: {
          id: investor.id,
          name: investor.name,
          slug: investor.slug,
          logo_url: investor.logo_url,
          partners: investor.partners,
          aum: investor.aum,
          funds_info: investor.funds_info,
          hq_location: investor.hq_location,
          other_locations: investor.other_locations,
          investment_stage: investor.investment_stage,
          investment_geo: investor.investment_geo,
          investment_focus: investor.investment_focus,
          investment_style: investor.investment_style,
          history: investor.history,
          investment_concept: investor.investment_concept,
          notable_investments: investor.notable_investments,
          investor_type: investor.investor_type,
          created_at: new Date(investor.created_at),
          updated_at: new Date(investor.updated_at),
          status: investor.status as ApprovalStatus
        }
      })
    )
  )

  // Seed Ratings
  console.log('Seeding ratings...')
  await Promise.all(
    mockRatings.map((rating: Rating) =>
      prisma.rating.create({
        data: {
          id: rating.id,
          user_id: rating.user_id,
          investor_id: rating.investor_id,
          score: rating.score,
          comments: rating.comments,
          stage_of_company: rating.stage_of_company,
          position_of_founder: rating.position_of_founder,
          status: rating.status as ApprovalStatus,
          created_at: new Date(rating.created_at),
          updated_at: new Date(rating.updated_at)
        }
      })
    )
  )

  // Seed Logs
  console.log('Seeding logs...')
  await Promise.all(
    mockLogs.map((log: Log) =>
      prisma.log.create({
        data: {
          id: log.id,
          rating_id: log.rating_id,
          timestamp: new Date(log.timestamp),
          log_type: log.log_type as LogType,
          log_message: log.log_message,
          stage_of_company: log.stage_of_company,
          position_of_founder: log.position_of_founder,
          status: log.status as ApprovalStatus
        }
      })
    )
  )

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 