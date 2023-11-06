# import os
from typing import List, Union
from pydantic import BaseModel
from queries.pool import pool

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


class UserStackOut(BaseModel):
    id: int
    account_id: int
    tech_stacks: List[str]


class UserStackIn(BaseModel):
    account_id: int
    tech_stacks: List[str]


class UserStackRepository:
    def user_stack_in(self, id: int, user_stack: UserStackIn):
        old_data = user_stack.dict()
        return UserStackOut(id=id, **old_data)

    def user_stack_out(self, record):
        return UserStackOut(
            id=record[0],
            account_id=record[1],
            tech_stacks=record[2],
        )

    def create_user_stack(self, user_stack: UserStackIn) -> UserStackOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO user_stacks (account_id, tech_stacks)
                        VALUES (%s, %s)
                        RETURNING id;
                        """,
                        [user_stack.account_id, user_stack.tech_stacks],
                    )
                    result = db.fetchone()
                    id = result[0]
                    return self.user_stack_out(
                        (id, user_stack.account_id, user_stack.tech_stacks)
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not create user stack"}

    def get_user_stacks(self) -> Union[Error, List[UserStackOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, account_id, tech_stacks
                        FROM user_stacks
                        ORDER BY id;
                        """
                    )
                    return [
                        UserStackOut(
                            id=record[0],
                            account_id=record[1],
                            tech_stacks=record[2],
                        )
                        for record in db.fetchall()
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all user stacks"}

    def list_user_stacks(
        self, account_id: int
    ) -> Union[Error, List[UserStackOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT us.id, us.account_id, us.tech_stacks
                        FROM user_stacks as us
                        INNER JOIN account as a ON a.id = us.account_id
                        WHERE us.account_id = %s
                        """,
                        [account_id],
                    )
                    return [
                        UserStackOut(
                            id=record[0],
                            account_id=record[1],
                            tech_stacks=record[2],
                        )
                        for record in db.fetchall()
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get user's tech stacks"}

    def get_user_stack(
        self, user_stack_id: int
    ) -> Union[UserStackOut, None]:  # Adjusted the return type
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, account_id, tech_stacks
                        FROM user_stacks
                        WHERE id = %s
                        """,
                        [user_stack_id],
                    )
                    record = db.fetchone()
                    if record is None:
                        return None
                    return self.user_stack_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that user stack"}

    def update_user_stack(
        self, user_stack_id: int, user_stack: UserStackIn
    ) -> Union[UserStackOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE user_stacks
                        SET account_id = %s, tech_stacks = %s
                        WHERE id = %s
                        """,
                        [
                            user_stack.account_id,
                            user_stack.tech_stacks,
                            user_stack_id,
                        ],
                    )
                    return self.user_stack_out(
                        (
                            user_stack_id,
                            user_stack.account_id,
                            user_stack.tech_stacks,
                        )
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update that user stack"}

    def delete_user_stack(self, user_stack_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM user_stacks
                        WHERE id = %s
                        """,
                        [user_stack_id],
                    )
                return True
        except Exception as e:
            print(e)
            return False
