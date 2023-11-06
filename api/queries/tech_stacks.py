# import os
from typing import List, Union
from pydantic import BaseModel
from queries.pool import pool

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


class TechStackOut(BaseModel):
    id: int
    name: str


class TechStackIn(BaseModel):
    name: str


class TechStacksRepository:
    def tech_stack_in_to_out(self, id: int, tech_stack: TechStackIn):
        old_data = tech_stack.dict()
        return TechStackOut(id=id, **old_data)

    def record_to_tech_stack_out(self, record):
        return TechStackOut(
            id=record[0],
            name=record[1],
        )

    def get_all_tech_stacks(self) -> Union[Error, List[TechStackOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, name
                        FROM tech_stacks
                        ORDER BY id;
                        """
                    )
                    return [
                        TechStackOut(id=record[0], name=record[1])
                        for record in db
                    ]

        except Exception as e:
            print(e)
            return {"message": "Could not get all tech stacks"}

    def get_tech_stack(self, tech_stack_id: int) -> List[TechStackOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , name
                        FROM tech_stacks
                        WHERE id = %s
                        """,
                        [tech_stack_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_tech_stack_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that tech stack"}

    def create_tech_stack(self, tech_stack: TechStackIn) -> TechStackOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO tech_stacks
                        (name)
                    VALUES
                        (%s)
                    RETURNING id;
                    """,
                    [tech_stack.name],
                )
                id = result.fetchone()[0]
                return self.tech_stack_in_to_out(id, tech_stack)

    def delete_tech_stack(self, tech_stack_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM tech_stacks
                        WHERE id = %s
                        """,
                        [tech_stack_id],
                    )
                return True
        except Exception as e:
            print(e)
            return False

    def update_tech_stack(
        self, tech_stack_id: int, tech_stack: TechStackIn
    ) -> Union[TechStackOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE tech_stacks
                        SET name = %s
                        WHERE id = %s
                        """,
                        [tech_stack.name, tech_stack_id],
                    )
                    return self.tech_stack_in_to_out(tech_stack_id, tech_stack)
        except Exception as e:
            print(e)
            return {"message": "Could not update that tech stack"}
