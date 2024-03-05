CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    role VARCHAR(255)
);

CREATE TABLE Masters(
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(255),
    city VARCHAR(255),
    contacts VARCHAR(255),
    picture_path VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Organizers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    contacts VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Events(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    date_start DATE,
    date_finish DATE,
    time_start TIME,
    time_finish TIME,
    city VARCHAR(255),
    address VARCHAR(255),
    link VARCHAR(255),
    cost INTEGER,
    path_picture VARCHAR(255),
    date_created DATE,
    organizer_id INTEGER,
    FOREIGN KEY (organizer_id) REFERENCES Organizers (id) ON DELETE CASCADE
);

CREATE TABLE Favourite_events(
    id SERIAL PRIMARY KEY,
    event_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (event_id) REFERENCES Events (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Favourite_masters(
    id SERIAL PRIMARY KEY,
    master_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (master_id) REFERENCES Masters (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Requests(
    id SERIAL PRIMARY KEY,
    master_id INTEGER,
    event_id INTEGER,
    is_approved BOOLEAN,
    FOREIGN KEY (master_id) REFERENCES Masters (id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events (id) ON DELETE CASCADE
);

CREATE TABLE Invetations(
    id SERIAL PRIMARY KEY,
    master_id INTEGER,
    event_id INTEGER,
    is_approved BOOLEAN,
    FOREIGN KEY (master_id) REFERENCES Masters (id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events (id) ON DELETE CASCADE
);

CREATE TABLE Products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    path_picture VARCHAR(255),
    cost INTEGER,
    master_id INTEGER,
    FOREIGN KEY (master_id) REFERENCES Masters (id) ON DELETE CASCADE
);

CREATE TABLE Masters_events(
    id SERIAL PRIMARY KEY,
    master_id INTEGER,
    event_id INTEGER,
    is_paid BOOLEAN,
    FOREIGN KEY (master_id) REFERENCES Masters (id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events (id) ON DELETE CASCADE
);

CREATE TABLE Passwords(
    user_id SERIAL PRIMARY KEY,
    hash_password VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
)
