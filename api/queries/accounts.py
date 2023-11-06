# import os
from queries.pool import pool
from typing import List, Union, Optional
from pydantic import BaseModel

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


class AccountOut(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    years_of_experience: Optional[str]
    education: Optional[str]
    picture: Optional[str]
    is_mentor: bool = False
    username: str
    tech_stacks: Optional[List[str]]


class AccountIn(BaseModel):
    username: str
    email: str
    password: str
    first_name: str
    last_name: str
    years_of_experience: Optional[str]
    education: Optional[str]
    picture: Optional[str]
    is_mentor: bool = False
    tech_stacks: Optional[List[str]]


class AccountInNoPassword(BaseModel):
    username: str
    email: str
    first_name: str
    last_name: str
    years_of_experience: Optional[str]
    education: Optional[str]
    picture: Optional[str]
    is_mentor: bool = False
    tech_stacks: Optional[List[str]]


class AccountRepository:
    def get_all_accounts(self) -> Union[Error, List[AccountOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                            , first_name
                            , last_name
                            , email
                            , password
                            , years_of_experience
                            , education
                            , picture
                            , is_mentor
                            , username
                            , tech_stacks
                        FROM account
                        ORDER BY first_name, last_name;
                        """
                    )

                    return [
                        AccountOut(
                            id=record[0],
                            first_name=record[1],
                            last_name=record[2],
                            email=record[3],
                            password=record[4],
                            years_of_experience=record[5],
                            education=record[6],
                            picture=record[7],
                            is_mentor=record[8],
                            username=record[9],
                            tech_stacks=record[10],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all accounts"}

    def get_account(self, account_id: int) -> Optional[AccountOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , first_name
                            , last_name
                            , email
                            , password
                            , years_of_experience
                            , education
                            , picture
                            , is_mentor
                            , username
                            , tech_stacks
                        FROM account
                        WHERE id = %s
                        """,
                        [account_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that account"}

    def delete_account(self, account_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                    DELETE FROM account
                    WHERE id = %s
                    """,
                        [account_id],
                    )
                return True
        except Exception as e:
            print(e)
            return False

    def update_account(
        self, account_id: int, account: AccountInNoPassword
    ) -> Union[AccountOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE account
                        SET first_name = %s
                            , last_name = %s
                            , email = %s
                            , username = %s
                            , years_of_experience = %s
                            , education = %s
                            , picture = %s
                            , is_mentor = %s
                            , tech_stacks = %s
                        WHERE id = %s
                        """,
                        [
                            account.first_name,
                            account.last_name,
                            account.email,
                            account.username,
                            account.years_of_experience,
                            account.education,
                            account.picture,
                            account.is_mentor,
                            account.tech_stacks,
                            account_id,
                        ],
                    )
                    return self.account_in_to_out(account_id, account)
        except Exception as e:
            print(e)
            return {"message": "Could not update that account"}

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)

    def record_to_account_out(self, record):
        return AccountOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            password=record[4],
            years_of_experience=record[5],
            education=record[6],
            picture=record[7],
            is_mentor=record[8],
            username=record[9],
            tech_stacks=record[10],
        )


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountRepo:
    def get(self, username: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, email, first_name, last_name, username, password
                    FROM account
                    WHERE username = %s;
                    """,
                    [username],
                )
                ac = cur.fetchone()
                if ac is not None:
                    return AccountOutWithPassword(
                        id=ac[0],
                        email=ac[1],
                        first_name=ac[2],
                        last_name=ac[3],
                        username=ac[4],
                        hashed_password=ac[5],
                    )
                else:
                    return {"message": "Account not found"}

    def create(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO account (
                        first_name, last_name, username, email, password, years_of_experience, education, picture, is_mentor, tech_stacks
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, first_name, last_name, username, email, password, years_of_experience, education, picture, is_mentor, tech_stacks
                    """,
                    [
                        account.first_name,
                        account.last_name,
                        account.username,
                        account.email,
                        hashed_password,
                        account.years_of_experience,
                        account.education,
                        account.picture,
                        account.is_mentor,
                        account.tech_stacks,
                    ],
                )
                id = result.fetchone()[0]
                return self.account_in_to_out(id, account, hashed_password)

    def account_in_to_out(self, id: int, account: AccountIn, hashed_password):
        return AccountOutWithPassword(
            id=id,
            username=account.username,
            email=account.email,
            first_name=account.first_name,
            last_name=account.last_name,
            hashed_password=hashed_password,
            years_of_experience=account.years_of_experience,
            education=account.education,
            picture=account.picture,
            is_mentor=account.is_mentor,
            tech_stacks=account.tech_stacks,
        )


class DuplicateAccountError(ValueError):
    pass
