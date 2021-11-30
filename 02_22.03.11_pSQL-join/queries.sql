-- write your queries here

--01
SELECT *
    FROM owners o LEFT JOIN vehicles v ON o.id = v.owner_id; 

--02
SELECT o.first_name, o.last_name, count(*) AS count
    FROM owners o JOIN vehicles v ON o.id = v.owner_id
    GROUP BY o.id
    ORDER BY count ASC;

--03
    --use CAST to round
SELECT o.first_name, o.last_name, CAST(AVG(v.price) AS INT) AS average_price, count(*) AS count
    FROM owners o JOIN vehicles v ON o.id = v.owner_id
    GROUP BY o.id
    HAVING COUNT(*) > 1 AND CAST(AVG(v.price) AS INT) > 10000
    ORDER BY count DESC;