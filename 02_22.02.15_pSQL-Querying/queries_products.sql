-- Comments in SQL Start with dash-dash --

--3.01
INSERT INTO products(name, price, can_be_returned) VALUES ('chair', 44.00, false);

--3.02 to 3.03
INSERT INTO products(name, price, can_be_returned) VALUES ('stool', 25.99, true), ('table', 124.00, false);

--3.04
SELECT * FROM products;

--3.05
SELECT name FROM products;

--3.06
SELECT name, price FROM products;

--3.07
INSERT INTO products(name, price, can_be_returned) VALUES ('chicken drumsticks', 5.99, false);

--3.08
SELECT * FROM products WHERE can_be_returned;

--3.09
SELECT * FROM products WHERE price < 44;

--3.10
SELECT * FROM products WHERE price BETWEEN 22.5 AND 99.99;

--3.11
UPDATE products
    SET price =
    CASE WHEN price < 21 THEN 1
    ELSE price - 20 END;

--3.12
DELETE FROM products
    WHERE price < 25;

--3.13
UPDATE products
    SET price = price + 20;

--3.14
UPDATE products
    SET can_be_returned = true;

