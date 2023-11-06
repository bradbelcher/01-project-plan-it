from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountRepo,
    AccountRepository,
    Error,
    DuplicateAccountError,
    AccountInNoPassword,
)
from jwt_down import Token
from pydantic import BaseModel
from authenticator import authenticator
from typing import Union, List, Optional

router = APIRouter()


@router.get("/api/accounts", response_model=Union[List[AccountOut], Error])
def get_all_accounts(
    repo: AccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_accounts()


@router.put(
    "/api/accounts/{account_id}", response_model=Union[AccountOut, Error]
)
def update_account(
    account_id: int,
    account: AccountInNoPassword,
    repo: AccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, AccountOut]:
    return repo.update_account(account_id, account)


@router.delete("/api/accounts/{account_id}", response_model=bool)
def delete_account(
    account_id=int,
    repo: AccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_account(account_id)


@router.get("/api/accounts/{account_id}", response_model=Optional[AccountOut])
def get_account(
    account_id: int,
    response: Response,
    repo: AccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> AccountOut:
    account = repo.get_account(account_id)
    if account is None:
        response.status_code = 404
        return None

    return account


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())
