# Project Plan-It API Documentation

Anyone with access to our project can access these endpoints.  To access the endpoints on a local project, please go to http://localhost:8000/docs.  If you are on our deployed project, you can visit https://may-11-pt-planiteersapi.mod3projects.com/docs.

## Interacting with Accounts endpoints -

The account endpoints are CRUD operations.  A user can create an account, get all accounts in the database, get a specific account, update a specific account and delete a specific account.  Here's our table:

```
[
        """
        CREATE TABLE account (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password VARCHAR(500) NOT NULL,
            years_of_experience NUMERIC(10, 2),
            education VARCHAR(150),
            picture TEXT,
            is_mentor BOOLEAN
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
            owner_id INTEGER NOT NULL REFERENCES account("id") ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE project;
        """,
    ],

```

### Create an account

#### POST method

#### Path: /api/accounts

#### Responses:

#### Status 200 - Successful Response -

```
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": 0,
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "years_of_experience": "string",
    "education": "string",
    "picture": "string",
    "is_mentor": false,
    "username": "string"
  }
}

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Get all accounts

#### GET method

#### Path: /api/accounts

#### Responses:

#### Status 200 - Successful Response -

```
[
  {
    "id": 0,
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "years_of_experience": "string",
    "education": "string",
    "picture": "string",
    "is_mentor": false,
    "username": "string"
  }
]

```

#### Status 422 - Validation Error -

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

### Get an account by id

#### GET method

#### Path: /api/accounts/{account_id}

#### Responses:

#### Status 200 - Successful Response -

```

{
  "id": 0,
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "years_of_experience": "string",
  "education": "string",
  "picture": "string",
  "is_mentor": false,
  "username": "string"
}

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Update an account by passing in its id

#### PUT method

#### Path: /api/accounts/{account_id}

#### Responses:

#### Status 200 - Successful Response -

```
{
  "id": 0,
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "years_of_experience": "string",
  "education": "string",
  "picture": "string",
  "is_mentor": true,
  "username": "string"
}

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Delete an account by passing in its id

#### DELETE method

#### Path: /api/accounts/{account_id}

#### Responses:

#### Status 200 - Successful Response -

```
true

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

## Interacting with Projects endpoints -

The project endpoints are CRUD operations.  A user can create a project get all projects in the database, get a specific project, update a specific project and delete a specific project.  Here's our table:

```

[
        """
        CREATE TABLE project (
            id SERIAL PRIMARY KEY NOT NULL,
            project_name VARCHAR(255) NOT NULL,
            project_picture VARCHAR(255) NOT NULL,
            goal TEXT NOT NULL,
            is_completed BOOLEAN NULL,
            owner_id INTEGER NOT NULL REFERENCES account("id") ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE project;
        """,
    ],

```

### Create a project

#### POST method

#### Path: /api/projects

#### Responses:

#### Status 200 - Successful Response -

```
{
  "id": 0,
  "project_name": "string",
  "project_picture": "string",
  "goal": "string",
  "is_completed": false,
  "owner_id": 0
}

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Get all projects

#### GET method

#### Path: /api/projects

#### Responses:

#### Status 200 - Successful Response -

```
[
  {
    "id": 0,
    "project_name": "string",
    "project_picture": "string",
    "goal": "string",
    "is_completed": false,
    "owner_id": 0
  }
]

```

### Get a project by its id

#### GET method

#### Path: /api/projects/{project_id}

#### Responses:

#### Status 200 - Successful Response -

{
  "id": 0,
  "project_name": "string",
  "project_picture": "string",
  "goal": "string",
  "is_completed": false,
  "owner_id": 0
}

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Update a project by its id

#### PUT method

#### Path: /api/projects/{project_id}

#### Responses:

#### Status 200 - Successful Response -

{
  "id": 0,
  "project_name": "string",
  "project_picture": "string",
  "goal": "string",
  "is_completed": true,
  "owner_id": 0
}

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Delete a project by its id

#### DELETE method

#### Path: /api/projects/{project_id}

#### Responses:

#### Status 200 - Successful Response -

```
true

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

## Interacting with Attendees endpoints -

The attendees endpoints are CRUD operations.  A user can create an attendee, get all attenddes in the database, get a specific attendee, update a specific attendee and delete a specific attendee.  Here's our table:

```
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

```

### Create an attendee

#### POST method

#### Path: /api/attendees

#### Responses:

#### Status 200 - Successful Response -

```

{
  "id": 0,
  "project_id": 0,
  "account_id": 0
}

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Get all project attendees

#### GET method

#### Path: /api/attendees

#### Responses:

#### Status 200 - Successful Response -

```

[
  {
    "id": 0,
    "project_id": 0,
    "account_id": 0
  }
]

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Get project attendees by passing in project_id

#### GET method

#### Path: /api/attendees/project/{project_id}

#### Responses:

#### Status 200 - Successful Response -

```

[
  {
    "id": 0,
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "username": "string"
  }
]

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Get attendees projects by passing in account_id

#### GET method

#### Path: /api/attendees/account/{account_id}

#### Responses:

#### Status 200 - Successful Response -

```

[
  {
    "id": 0,
    "project_name": "string",
    "project_picture": "string",
    "goal": "string",
    "is_completed": "string",
    "owner_id": 0
  }
]

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

## Interacting with Tech Stacks endpoints -

The tech stacks endpoints are CRUD operations.  A user can create a tech stack, get all tech stacks in the database, get a specific tech stack, update a specific tech stack and delete a specific tech stack.  Here's our table:

```

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


```

### Create a tech stack

#### POST method

#### Path: /api/tech-stacks

#### Responses:

#### Status 200 - Successful Response -

```
{
  "id": 0,
  "name": "string"
}

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Get all tech stacks

#### GET method

#### Path: /api/tech-stacks/

#### Responses:

#### Status 200 - Successful Response -

```
[
  {
    "id": 1,
    "name": "HTML"
  },
  {
    "id": 2,
    "name": "CSS"
  },
  {
    "id": 3,
    "name": "JavaScript"
  },
  {
    "id": 4,
    "name": "jQuery"
  },
  {
    "id": 5,
    "name": "Bootstrap"
  },
  {
    "id": 6,
    "name": "React"
  },
  {
    "id": 7,
    "name": "Angular"
  },
  {
    "id": 8,
    "name": "Vue.js"
  },
  {
    "id": 9,
    "name": "TypeScript"
  },
  {
    "id": 10,
    "name": "Swift"
  },
  {
    "id": 11,
    "name": "Kotlin"
  },
  {
    "id": 12,
    "name": "React Native"
  },
  {
    "id": 13,
    "name": "Flutter"
  },
  {
    "id": 14,
    "name": "Linux"
  },
  {
    "id": 15,
    "name": "Apache"
  },
  {
    "id": 16,
    "name": "MySQL"
  },
  {
    "id": 17,
    "name": "PHP"
  },
  {
    "id": 18,
    "name": "MongoDB"
  },
  {
    "id": 19,
    "name": "Express.js"
  },
  {
    "id": 20,
    "name": "Angular"
  },
  {
    "id": 21,
    "name": "Node.js"
  },
  {
    "id": 22,
    "name": "Ruby"
  },
  {
    "id": 23,
    "name": "Ruby on Rails"
  },
  {
    "id": 24,
    "name": "PostgreSQL"
  },
  {
    "id": 25,
    "name": "Django"
  },
  {
    "id": 26,
    "name": "Java"
  },
  {
    "id": 27,
    "name": "Spring Boot"
  },
  {
    "id": 28,
    "name": "Hibernate"
  },
  {
    "id": 29,
    "name": "C#"
  },
  {
    "id": 30,
    "name": "ASP.NET"
  },
  {
    "id": 31,
    "name": "Entity Framework"
  },
  {
    "id": 32,
    "name": "Ember.js"
  },
  {
    "id": 33,
    "name": "Backbone.js"
  },
  {
    "id": 34,
    "name": "Aurelia"
  },
  {
    "id": 35,
    "name": "Knockout.js"
  },
  {
    "id": 36,
    "name": "Flask"
  },
  {
    "id": 37,
    "name": "Sinatra"
  },
  {
    "id": 38,
    "name": "Play Framework"
  },
  {
    "id": 39,
    "name": "FastAPI"
  },
  {
    "id": 40,
    "name": "Nest.js"
  },
  {
    "id": 41,
    "name": "Phoenix"
  },
  {
    "id": 42,
    "name": "Meteor"
  },
  {
    "id": 43,
    "name": "Grails"
  },
  {
    "id": 44,
    "name": "Sails.js"
  },
  {
    "id": 45,
    "name": "LoopBack"
  },
  {
    "id": 46,
    "name": "Strapi"
  },
  {
    "id": 47,
    "name": "Prisma"
  },
  {
    "id": 48,
    "name": "Kubernetes"
  }
]

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}


```

### Get a specific tech stack by passing in its id

#### GET method

#### Path: /api/tech-stacks/{tech_stack_id}

#### Responses:

#### Status 200 - Successful Response -

```
{
  "id": 1,
  "name": "HTML"
}

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Update a specific tech stack by passing in its id

#### PUT method

#### Path: /api/tech-stacks/{tech_stack_id}

#### Responses:

#### Status 200 - Successful Response -

```

{
  "id": 0,
  "name": "string"
}

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Delete a specific tech stack by passing in its id

#### DELETE method

#### Path: /api/tech-stacks/{tech_stack_id}

#### Responses:

#### Status 200 - Successful Response -

```
true

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

## Interacting with Project Stacks endpoints -

The project endpoints are CRUD operations.  A user can create a project stack, get all project stacks in the database, get a specific project stack, update a specific project stack and delete a specific project stack.  Here's our table:

```

[
        """
        CREATE TABLE project_stacks (
            id SERIAL PRIMARY KEY NOT NULL,
            project_id INTEGER NOT NULL REFERENCES project("id") ON DELETE CASCADE,
            tech_stacks_id VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE project_stacks;
        """,
    ],

```

### Create a project stack

#### POST method

#### Path: /api/project-stacks

#### Responses:

#### Status 200 - Successful Response -


```

{
  "id": 0,
  "project_id": 0,
  "tech_stacks_id": [
    "string"
  ]
}

```

#### Status 422 - Validation Error -

```

{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```


### Get all project stacks

#### GET method

#### Path: /api/project-stacks/

#### Responses:

#### Status 200 - Successful Response -

```
[
  {
    "id": 0,
    "project_id": 0,
    "tech_stacks_id": [
      "string"
    ]
  }
]

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Get a project stack by passing in its project stacks id

#### GET method

#### Path: /api/project-stacks/{project_stack_id}

#### Responses:

#### Status 200 - Successful Response -

```

{
  "id": 0,
  "project_id": 0,
  "tech_stacks_id": [
    "string"
  ]
}

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Update a project stack by passing in its project stacks id

#### PUT method

#### Path: /api/project-stacks/{project_stack_id}

#### Responses:

#### Status 200 - Successful Response -

```
{
  "id": 0,
  "project_id": 0,
  "tech_stacks_id": [
    "string"
  ]
}

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Delete a project stack by passing in its project stacks id

#### DELETE method

#### Path: /api/project-stacks/{project_stack_id}

#### Responses:

#### Status 200 - Successful Response -

```
true

```

#### Status 422 - Validation Error -


```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

## Interacting with Project Stacks endpoints -

The user stacks endpoints are CRUD operations.  A user can create a user stack, get all user stacks in the database, get a specific user stack, update a specific user stack and delete a specific user stack.  Here's our table:

```

[
        """
        CREATE TABLE user_stacks (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INTEGER NOT NULL REFERENCES account("id") ON DELETE CASCADE,
            tech_stack_id VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE user_stacks;
        """,
    ],

```

### Create a user stack

#### POST method

#### Path: /api/user-stacks

#### Responses:

#### Status 200 - Successful Response -

```
{
  "id": 0,
  "account_id": 0,
  "tech_stack_id": [
    "string"
  ]
}

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Get all user stacks

#### GET method

#### Path: /api/user-stacks/

#### Responses:

#### Status 200 - Successful Response -

```

[
  {
    "id": 0,
    "account_id": 0,
    "tech_stack_id": [
      "string"
    ]
  }
]

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Get a specific user stack by passing in the user stack id or account id

#### GET method

#### Path: /api/user-stacks/{user_stack_id} or /api/user-stacks/{account_id}

#### Responses:

#### Status 200 - Successful Response -

```
{
  "id": 0,
  "account_id": 0,
  "tech_stack_id": [
    "string"
  ]
}

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Update a specific user stack by passing in the user stack id

#### PUT method

#### Path: /api/user-stacks/{user_stack_id}

#### Responses:

#### Status 200 - Successful Response -

```
{
  "account_id": 0,
  "tech_stack_id": [
    "string"
  ]
}

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Delete a specific user stack by passing in the user stack id

#### DELETE method

#### Path: /api/user-stacks/{user_stack_id}

#### Responses:

#### Status 200 - Successful Response -

```
true

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

## Interacting with Authentication/Token endpoints -

Set up so you can create an account and login, giving you a token that gives you access to use all of the other endpoints in our application.

### Create a token

#### POST method

#### Path: /token

#### Responses:

#### Status 200 - Successful Response -

```
{
  "access_token": "string",
  "token_type": "Bearer"
}

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Get a token

#### GET method

#### Path: /token

#### Responses:

#### Status 200 - Successful Response -

```

{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": 0,
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "years_of_experience": "string",
    "education": "string",
    "picture": "string",
    "is_mentor": true,
    "username": "string"
  }
}

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

### Delete a token

#### DELETE method

#### Path: /token

#### Responses:

#### Status 200 - Successful Response -

```
true

```

#### Status 422 - Validation Error -

```
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```
