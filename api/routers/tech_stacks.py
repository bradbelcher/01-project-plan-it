from authenticator import authenticator
from fastapi import APIRouter, Depends, Response
from queries.tech_stacks import (
    TechStackIn,
    TechStackOut,
    TechStacksRepository,
    Error,
)
from typing import Union, List, Optional

router = APIRouter()


@router.get("/api/tech-stacks/", response_model=List[TechStackOut])
def get_all_tech_stacks(
    repo: TechStacksRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    tech_stacks = repo.get_all_tech_stacks()
    return tech_stacks


@router.put(
    "/api/tech-stacks/{tech_stack_id}",
    response_model=Union[TechStackOut, Error],
)
def update_tech_stack(
    tech_stack_id: int,
    tech_stack: TechStackIn,
    repo: TechStacksRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, TechStackOut]:
    return repo.update_tech_stack(tech_stack_id, tech_stack)


@router.delete("/api/tech-stacks/{tech_stack_id}", response_model=bool)
def delete_tech_stack(
    tech_stack_id: int,
    repo: TechStacksRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_tech_stack(tech_stack_id)


@router.get(
    "/api/tech-stacks/{tech_stack_id}", response_model=Optional[TechStackOut]
)
def get_tech_stack(
    tech_stack_id: int,
    response: Response,
    repo: TechStacksRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> TechStackOut:
    tech_stack = repo.get_tech_stack(tech_stack_id)
    if tech_stack is None:
        response.status_code = 404
        return None

    return tech_stack


@router.post("/api/tech-stacks", response_model=Union[TechStackOut, Error])
def create_tech_stack(
    tech_stack: TechStackIn,
    response: Response,
    repo: TechStacksRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status_code = 200
    return repo.create_tech_stack(tech_stack)
