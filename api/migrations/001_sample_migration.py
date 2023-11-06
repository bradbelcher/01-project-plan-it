steps = [
    [
        """
        CREATE TABLE account (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password VARCHAR(500) NOT NULL,
            years_of_experience VARCHAR(100),
            education VARCHAR(150),
            picture TEXT,
            is_mentor BOOLEAN,
            tech_stacks TEXT ARRAY
        );
        """,
        """
        DROP TABLE account;
        """,
    ],
    [
        """
        CREATE TABLE project (
            id SERIAL PRIMARY KEY NOT NULL,
            project_name VARCHAR(255) NOT NULL,
            project_picture VARCHAR(255) NOT NULL,
            goal TEXT NOT NULL,
            is_completed BOOLEAN NULL,
            owner_id INTEGER NOT NULL REFERENCES account("id") ON DELETE CASCADE,
            tech_stacks TEXT ARRAY
        );
        """,
        """
        DROP TABLE project;
        """,
    ],
    [
        """
        CREATE TABLE tech_stacks (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL
        );
        INSERT INTO tech_stacks VALUES
            (1, 'HTML'),
            (2, 'CSS'),
            (3, 'JavaScript'),
            (4, 'jQuery'),
            (5, 'Bootstrap'),
            (6, 'React'),
            (7, 'Angular'),
            (8, 'Vue.js'),
            (9, 'TypeScript'),
            (10, 'Swift'),
            (11, 'Kotlin'),
            (12, 'React Native'),
            (13, 'Flutter'),
            (14,'Linux'),
            (15, 'Apache'),
            (16, 'MySQL'),
            (17, 'PHP'),
            (18, 'MongoDB'),
            (19, 'Express.js'),
            (20, 'Angular'),
            (21, 'Node.js'),
            (22, 'Ruby'),
            (23, 'Ruby on Rails'),
            (24, 'PostgreSQL'),
            (25, 'Django'),
            (26, 'Java'),
            (27, 'Spring Boot'),
            (28, 'Hibernate'),
            (29, 'C#'),
            (30, 'ASP.NET'),
            (31, 'Entity Framework'),
            (32, 'Ember.js'),
            (33, 'Backbone.js'),
            (34, 'Aurelia'),
            (35, 'Knockout.js'),
            (36, 'Flask'),
            (37, 'Sinatra'),
            (38, 'Play Framework'),
            (39,'FastAPI'),
            (40, 'Nest.js'),
            (41, 'Phoenix'),
            (42, 'Meteor'),
            (43, 'Grails'),
            (44, 'Sails.js'),
            (45, 'LoopBack'),
            (46, 'Strapi'),
            (47, 'Prisma'),
            (48, 'Kubernetes')
        """,
        """
        DROP TABLE tech_stacks;
        """,
    ],
    [
        """
        CREATE TABLE user_stacks (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INTEGER NOT NULL REFERENCES account("id") ON DELETE CASCADE,
            tech_stacks TEXT ARRAY
        );
        """,
        """
        DROP TABLE user_stacks;
        """,
    ],
    [
        """
        CREATE TABLE project_stacks (
            id SERIAL PRIMARY KEY NOT NULL,
            project_id INTEGER NOT NULL REFERENCES project("id") ON DELETE CASCADE,
            tech_stacks TEXT ARRAY
        );
        """,
        """
        DROP TABLE project_stacks;
        """,
    ],
    [
        """
        CREATE TABLE attendees (
            id SERIAL PRIMARY KEY NOT NULL,
            project_id INTEGER NOT NULL REFERENCES project("id") ON DELETE CASCADE,
            account_id INTEGER NOT NULL REFERENCES account("id") ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE attendees;
        """,
    ],
]
