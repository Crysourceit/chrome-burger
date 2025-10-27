
# cheat sheet

## SQL

1. INNER JOIN - Fetch Only Matching Records

    ```sql 
    SELECT customer.first_name, customer.last_name, invoice.Total
    FROM customer
    INNER JOIN invoice ON customer.customer_id = invoice.customer_id;
    ```

2. LEFT JOIN - Show All Records from One Table, Even if There’s No Match

   ```sql 
    SELECT customer.first_name, customer.last_name, invoice.total
    FROM customer
    LEFT JOIN invoice ON customer.customer_id = invoice.customer_id;
    ```
   
3. RIGHT JOIN  - Show All Records from the Second Table

    ```sql
    SELECT customer.first_name, customer.last_name, invoice.total
    FROM customer
    RIGHT JOIN invoice ON customer.customer_id = invoice.customer_id;
    ```

4. FULL OUTER JOIN - Show All Records from Both Tables

   ```sql
   SELECT customer.first_name, customer.last_name, invoice.Total 
    FROM customer 
    LEFT JOIN invoice ON customer.customer_id = invoice.customer_id 
    UNION 
    SELECT customer.first_name, customer.last_name, invoice.Total 
    FROM invoice 
    LEFT JOIN customer ON customer.customer_id = invoice.customer_id;
   ```

> ## [tech neeti chatGPT 1](https://chatgpt.com/share/68f8688f-f9e8-800e-8b65-cbe23a26e68a).

> ## [tech neeti chatGPT2](https://chatgpt.com/share/68f86d01-ee80-800e-a136-68a812f4031d).

![concept](./assets/png/01.png)

![concepts](./assets/png/02.png)

---
---

## noSQL
  
![concepts](./assets/png/03.png)

> ## [tech neeti chatGPT1](https://chatgpt.com/share/68fed2c3-ab38-800e-baec-e6729a1e63c0)

1. find() and findOne()
   
    ```nosql
    db.collection.find(<query>, <projection>, <options>)

    db.collection.findOne( <query>, <projection>, <options>)
    ```
![concepts](./assets/png/04.png)

![concepts](./assets/png/05.png)

![concepts](./assets/png/06.png)

![concepts](./assets/png/07.png)

2. Nested Fields

    ```nosql
    db.collection.find({“root.child_1.child_1_1”: “condition”})

    db.collection.find({“location.address.city”: “California”}) 
    ```

![concepts](./assets/png/08.png)

![concepts](./assets/png/09.png)

![concepts](./assets/png/10.png)

![concepts](./assets/png/11.png)

![concepts](./assets/png/12.png)

![concepts](./assets/png/13.png)

![concepts](./assets/png/14.png)


3. Aggregation Pipeline

![concepts](./assets/png/15.png)

![concepts](./assets/png/16.png)

![concepts](./assets/png/17.png)

![concepts](./assets/png/18.png)

![concepts](./assets/png/19.png)

![concepts](./assets/png/20.png)

![concepts](./assets/png/21.png)

![concepts](./assets/png/22.png)

![concepts](./assets/png/23.png)

![concepts](./assets/png/24.png)

![concepts](./assets/png/25.png)

![concepts](./assets/png/26.png)

![concepts](./assets/png/27.png)

