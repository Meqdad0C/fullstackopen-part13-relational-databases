CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    likes integer default 0
);

INSERT INTO blogs (author, url, likes) VALUES ('Michael Chan', 'https://reactpatterns.com/', 7);
INSERT INTO blogs (author, url, likes) VALUES ('Edsger W. Dijkstra', 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', 5);

