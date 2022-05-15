//mport { PrismaClient } from '@prisma/client'
import {app} from './app'


const port = Number(process.env.PORT || process.env.PORT || 8080);
app.listen(port, () => {
  console.info('Express application started on port: ' + port);
});
//const prisma = new PrismaClient()
/**async function main() {
  
  await prisma.$connect()
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) */