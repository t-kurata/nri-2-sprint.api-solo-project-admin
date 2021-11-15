exports.up = function (knex) {
    return knex.schema.createTable("ramen", (t) => {
      t.string("id").unique().notNullable();
      t.string("ramen_name", 30).notNullable().index();
      t.string("category", 30).notNullable().index();
      t.integer("price").notNullable().index();
      t.string("image").notNullable().index();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("ramen");
  };