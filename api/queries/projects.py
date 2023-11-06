from typing import List, Optional
from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class ProjectIn(BaseModel):
    project_name: str
    project_picture: str
    goal: str
    is_completed: bool = False
    owner_id: int
    tech_stacks: Optional[List[str]]


class ProjectOut(BaseModel):
    id: int
    project_name: str
    project_picture: str
    goal: str
    is_completed: bool = False
    owner_id: int
    tech_stacks: Optional[List[str]]


class ProjectRepository:
    def delete(self, project_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM project
                        WHERE id = %s
                        """,
                        [project_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def create(self, project: ProjectIn) -> ProjectOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO project
                        (project_name, project_picture, goal, is_completed,
                        owner_id, tech_stacks)
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        project.project_name,
                        project.project_picture,
                        project.goal,
                        project.is_completed,
                        project.owner_id,
                        project.tech_stacks,
                    ],
                )
                id = result.fetchone()[0]
                old_data = project.dict()
                return ProjectOut(id=id, **old_data)


class ProjectQueries:
    def get_all_projects(self) -> List[ProjectOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, project_name, project_picture, goal,
                            is_completed, owner_id, tech_stacks
                        FROM project"""
                    )

                    return [
                        ProjectOut(
                            id=row[0],
                            project_name=row[1],
                            project_picture=row[2],
                            goal=row[3],
                            is_completed=row[4],
                            owner_id=row[5],
                            tech_stacks=row[6],
                        )
                        for row in cur.fetchall()
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all projects"}

    def get_project(self, id: int) -> ProjectOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, project_name, project_picture, goal,
                            is_completed, owner_id, tech_stacks
                        FROM project
                        WHERE id = %s
                        """,
                        [id],
                    )

                    row = cur.fetchone()
                    if row is not None:
                        return ProjectOut(
                            id=row[0],
                            project_name=row[1],
                            project_picture=row[2],
                            goal=row[3],
                            is_completed=row[4],
                            owner_id=row[5],
                            tech_stacks=row[6],
                        )
        except Exception as e:
            print(e)
            raise ValueError("Could not get that project")

    def update_project(self, id: int, data: ProjectIn) -> None:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE project
                        SET project_name = %s,
                            project_picture = %s,
                            goal = %s,
                            is_completed = %s,
                            owner_id = %s,
                            tech_stacks = %s
                        WHERE id = %s
                        """,
                        [
                            data.project_name,
                            data.project_picture,
                            data.goal,
                            data.is_completed,
                            data.owner_id,
                            data.tech_stacks,
                            id,
                        ],
                    )
                    conn.commit()
        except Exception as e:
            print(e)
            return {"message": "Could not update that project"}
