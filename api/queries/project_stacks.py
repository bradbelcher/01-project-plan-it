# import os
from typing import Union, List
from pydantic import BaseModel
from queries.pool import pool

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


class ProjectStackOut(BaseModel):
    id: int
    project_id: int
    tech_stacks: List[str]


class ProjectStackIn(BaseModel):
    project_id: int
    tech_stacks: List[str]


class ProjectStacksRepository:
    def project_stack_in_to_out(self, id: int, project_stack: ProjectStackIn):
        old_data = project_stack.dict()
        return ProjectStackOut(id=id, **old_data)

    def record_to_project_stack_out(self, record):
        return ProjectStackOut(
            id=record[0], project_id=record[1], tech_stacks=record[2]
        )

    def get_all_project_stacks(self) -> Union[Error, List[ProjectStackOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, project_id, tech_stacks
                        FROM project_stacks
                        ORDER BY id;
                        """
                    )
                    return [
                        ProjectStackOut(
                            id=record[0],
                            project_id=record[1],
                            tech_stacks=record[2],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all project stacks"}

    def get_project_stack(
        self, project_stack_id: int
    ) -> List[ProjectStackOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, project_id, tech_stacks
                        FROM project_stacks
                        WHERE id = %s
                        """,
                        [project_stack_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_project_stack_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that project stack"}

    def create_project_stack(
        self, project_stack: ProjectStackIn
    ) -> ProjectStackOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO project_stacks
                        (project_id, tech_stacks)
                    VALUES
                        (%s, %s)
                    RETURNING id;
                    """,
                    [
                        project_stack.project_id,
                        project_stack.tech_stacks,
                    ],
                )
                id = result.fetchone()[0]
                return self.project_stack_in_to_out(id, project_stack)

    def delete_project_stack(self, project_stack_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM project_stacks
                        WHERE id = %s
                        """,
                        [project_stack_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update_project_stack(
        self, project_stack_id: int, project_stack: ProjectStackIn
    ) -> Union[ProjectStackOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE project_stacks
                        SET project_id = %s,
                            tech_stacks = %s
                        WHERE id = %s
                        """,
                        [
                            project_stack.project_id,
                            project_stack.tech_stacks,
                            project_stack_id,
                        ],
                    )
                    return self.project_stack_in_to_out(
                        project_stack_id, project_stack
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update that project stack"}
