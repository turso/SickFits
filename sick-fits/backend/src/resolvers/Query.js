const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // }

  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },

  async users(parent, args, ctx, info) {
    // 1. check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must logged in!');
    }

    // 2. check if the user have the permission to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONTOUPDATE']);

    // 3. if they do, query all the users!
    return ctx.db.query.users({}, info);
  }
};

module.exports = Query;
