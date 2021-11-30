-- Comments in SQL Start with dash-dash --

--01
SELECT * FROM analytics WHERE id = 1880;

--02
SELECT * FROM analytics WHERE last_updated = '2018-08-01';

--03
SELECT category, COUNT(*) AS category_count FROM analytics GROUP BY category;

--04
SELECT app_name, reviews, rating FROM analytics ORDER BY reviews DESC LIMIT 5;

--05
SELECT app_name, reviews, rating FROM analytics WHERE rating >= 4.8 ORDER BY reviews DESC LIMIT 1;

--06
SELECT category, AVG(rating) as avg_rating FROM analytics GROUP BY category ORDER BY avg_rating DESC;

--07
SELECT app_name, price, rating FROM analytics WHERE rating < 3 ORDER BY price DESC LIMIT 1;

--08
SELECT app_name, rating, min_installs FROM analytics WHERE (min_installs <= 50 AND rating IS NOT NULL) ORDER BY rating DESC;

--09
SELECT app_name, rating, reviews FROM analytics WHERE (rating <= 3 AND reviews >= 10000);

--10
SELECT app_name, reviews, price FROM analytics WHERE (price BETWEEN 0.1 AND 1) ORDER BY reviews DESC LIMIT 10;

--11
SELECT MIN(last_updated) FROM analytics;    --2010-05-21
SELECT app_name, last_updated FROM analytics WHERE last_updated = '2010-05-21';

--12
SELECT app_name, price FROM analytics ORDER BY price DESC LIMIT 1;

--13
SELECT COUNT(reviews) FROM analytics;

--14
SELECT category, COUNT(*) AS category_count FROM analytics GROUP BY category HAVING COUNT(*) > 300;

--15
SELECT app_name, reviews, min_installs, (reviews/min_installs) AS proportion FROM analytics WHERE min_installs > 100000 ORDER BY proportion DESC LIMIT 1;