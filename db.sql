CREATE TABLE IF NOT EXISTS Matches (
    match_id INT NOT NULL,
    start_time DATE,
    result VARCHAR(30),
    PRIMARY KEY (match_id)
);

CREATE TABLE IF NOT EXISTS Item (
    item_id INT,
    name VARCHAR(30),
    PRIMARY KEY (item_id)
);

CREATE TABLE IF NOT EXISTS Hero (
    hero_id INT,
    name VARCHAR(30),
    PRIMARY KEY (hero_id)
);

CREATE TABLE IF NOT EXISTS Player (
    account_id INT,
    personaname VARCHAR(30),
    PRIMARY KEY (account_id)
);

CREATE TABLE IF NOT EXISTS Plays_in (
    account_id INT,
    match_id INT,
    kills INT,
    assistss INT,
    deaths INT,
    player_slot INT,
    denies INT,
    last_hits INT,
    damage_taken INT,
    damage INT,
    gold_per_min FLOAT,
    xp_per_min FLOAT,
    PRIMARY KEY (account_id, match_id),
    FOREIGN KEY (account_id) REFERENCES Player(account_id)
        ON DELETE CASCADE,
    FOREIGN KEY (match_id) REFERENCES Matches(match_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Freq_items (
    hero_id INT,
    item_id INT,
    winning_rate FLOAT,
    frequency FLOAT,
    PRIMARY KEY (hero_id, item_id),
    FOREIGN KEY (hero_id) REFERENCES Hero(hero_id)
        ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Item(item_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Freq_heroes (
    hero_id INT,
    account_id INT,
    winning_rate FLOAT,
    frequency FLOAT,
    PRIMARY KEY (hero_id, account_id),
    FOREIGN KEY (hero_id) REFERENCES Hero(hero_id)
        ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES Player(account_id)
        ON DELETE CASCADE
);