CREATE SCHEMA IF NOT EXISTS votingapp;

CREATE TABLE votingapp.voters (
    id serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    voted BOOLEAN NOT NULL
);
CREATE TABLE votingapp.candidates (
    id serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    votes INT NOT NULL
);


INSERT INTO votingapp.voters (name, voted) VALUES ('Peppa', false);
INSERT INTO votingapp.voters (name, voted) VALUES ('Rumcajs', true);

INSERT INTO votingapp.candidates (name, votes) VALUES ('Johny', 2);
INSERT INTO votingapp.candidates (name, votes) VALUES ('Pluto', 5);
