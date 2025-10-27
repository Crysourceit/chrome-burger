-- SELECT 
--     s.first_name,
--     s.last_name,
--     COUNT(o.order_id) AS total_orders
-- FROM Staff s
-- LEFT JOIN Orders o ON s.staff_id = o.staff_id
-- GROUP BY s.staff_id, s.first_name, s.last_name
-- ORDER BY total_orders DESC;



-- -- SELECT order_date, total_price FROM Orders;
-- SELECT 
--     DATE(order_date) AS sale_date,
--     SUM(total_price) AS total_revenue
-- FROM Orders
-- GROUP BY DATE(order_date)
-- ORDER BY sale_date;

-- SELECT name, price FROM MenuItems ORDER BY price ASC LIMIT 3;

-- SELECT * FROM ingredients;
-- SELECT * FROM suppliers;

-- SELECT Ingredients.name
-- FROM Ingredients
-- JOIN Suppliers ON Ingredients.supplier_id = Suppliers.supplier_id
-- WHERE Suppliers.name = 'Patty''s Premium Meats';

-- SELECT
--     s.first_name,
--     s.last_name,
--     COUNT(o.order_id) AS order_count
-- FROM Staff s
-- JOIN Orders o ON s.staff_id = o.staff_id
-- GROUP BY s.staff_id
-- ORDER BY order_count DESC;


-- SELECT
--     DATE(order_date) AS sales_day,
--     SUM(total_price) AS daily_revenue
-- FROM Orders
-- GROUP BY sales_day
-- ORDER BY sales_day;


-- SELECT
--     mi.name,
--     SUM(oi.quantity) AS total_sold
-- FROM OrderItems oi
-- JOIN MenuItems mi ON oi.item_id = mi.item_id
-- GROUP BY mi.name
-- ORDER BY total_sold DESC
-- LIMIT 1;


-- SELECT
--     i.name,
--     ri.quantity_needed,
--     i.unit
-- FROM RecipeItems ri
-- JOIN MenuItems mi ON ri.item_id = mi.item_id
-- JOIN Ingredients i ON ri.ingredient_id = i.ingredient_id
-- WHERE mi.name = 'Bacon Cheeseburger';


