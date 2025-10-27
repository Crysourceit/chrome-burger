// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("chrome-burger-db");

// db.staff.find({});

// db.menu_items.find({category: "Burger"})

// db.menu_items.find().sort({ price: -1 });

// db.menu_items.find().sort({ price: 1 }).limit(3);
// -----------------------------------------


// db.ingredients.find({supplier_id: });

db.suppliers.findOne({ suppliers_id: "Patty's Premium Meats" });