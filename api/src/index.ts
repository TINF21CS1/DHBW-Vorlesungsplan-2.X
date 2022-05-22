import {app} from './app'


const port = Number(process.env.PORT || process.env.PORT || 8080);
app.listen(port, () => {
  console.info('Express application started on port: ' + port);
});
/**const prisma = new PrismaClient()
async function main() {
  console.log("hi");
  await prisma.$connect()
  const user= await prisma.user.create({
    data:{
        name:"test2",
        email:"tes2t",
        salt:"test3",
        pass:"test3"
      }
})
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
  console.log("hi2");
  
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) */