const CategorySeed = require("./categorySeeds.js");
const ProductSeed = require("./prodSeeds.js");
const TagSeed = require("./tagSeeeds.js");
const ProdTagSeed = require("./prodTagSeeds.js");
// all my seeds
const sequelize = require("../config/connect.js");
// require all of my seeding from each file
// seed everythhing
// async function that asyncs => awaits on promise objects for each seed
    // await all seeds
    // await all seeds
    // await all seeds
    // await all seeds
const seed = async () => {
  await sequelize.sync({ force: true });
  console.log("\n~~~sequelize~synced~~~\n");
  await CategorySeed();
  console.log("\n~~~sequelize~synced~~~\n");
  await ProductSeed();
  console.log("\n~~~sequelize~synced~~~\n");
  await TagSeed();
  console.log("\n~~~sequelize~synced~~~\n");
  await ProdTagSeed();
  console.log("\n~~~sequelize~synced~~~\n");
  process.exit(0);
};

seed();
