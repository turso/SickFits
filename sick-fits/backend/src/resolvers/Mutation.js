const Mutations = {
  createDog(parent, args, ctx, info) {
    global.dogs = global.dogs || [];
    // create a dog
    const newDog = { name: args.name };
    global.dogs.push(newDog);
    return newDog;
    console.log(args);
  }
};

module.exports = Mutations;
