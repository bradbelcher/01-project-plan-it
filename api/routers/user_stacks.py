from authenticator import authenticator
from fastapi import APIRouter, Depends, Response
from queries.user_stacks import (
    UserStackIn,
    UserStackOut,
    UserStackRepository,
    Error,
)
from typing import Union, List, Optional


router = APIRouter()


@router.post("/api/user-stacks", response_model=Union[UserStackOut, Error])
def create_user_stack(
    user_stack: UserStackIn,
    repo: UserStackRepository = Depends(),
    response: Response = None,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status_code = 201
    return repo.create_user_stack(user_stack)


@router.get("/api/user-stacks/", response_model=List[UserStackOut])
def get_user_stacks(
    repo: UserStackRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_stacks = repo.get_user_stacks()
    return user_stacks


@router.get(
    "/api/user-stacks/{account_id}",
    response_model=List[UserStackOut],
)
def list_user_stacks(
    account_id: int,
    repo: UserStackRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.list_user_stacks(account_id)


@router.get(
    "/api/user-stacks/{user_stack_id}", response_model=Optional[UserStackOut]
)
def get_user_stack(
    user_stack_id: int,
    repo: UserStackRepository = Depends(),
    response: Response = None,
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserStackOut:
    user_stack = repo.get_user_stack(user_stack_id)
    if user_stack is None:
        response.status_code = 404
        return None

    return user_stack


@router.put(
    "/api/user-stacks/{user_stack_id}",
    response_model=Union[UserStackOut, Error],
)
def update_user_stack(
    user_stack_id: int,
    user_stack: UserStackIn,
    repo: UserStackRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.update_user_stack(user_stack_id, user_stack)


@router.delete("/api/user-stacks/{user_stack_id}", response_model=bool)
def delete_user_stack(
    user_stack_id: int,
    repo: UserStackRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_user_stack(user_stack_id)
