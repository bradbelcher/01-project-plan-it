import os
from fastapi import Depends
from jwt_down import Authenticator
from queries.accounts import AccountRepo, AccountOut, AccountOutWithPassword


class AccountAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountRepo,
    ):
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountRepo = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        return account.username, AccountOut(**account.dict())


authenticator = AccountAuthenticator(os.environ["SIGNING_KEY"])
