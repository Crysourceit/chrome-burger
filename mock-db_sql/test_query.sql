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

