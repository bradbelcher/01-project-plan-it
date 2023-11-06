from authenticator import authenticator
from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.project_stacks import (
    ProjectStackIn,
    ProjectStackOut,
    ProjectStacksRepository,
    Error,
)

router = APIRouter()


@router.get("/api/project-stacks/", response_model=List[ProjectStackOut])
def get_all_project_stacks(
    repo: ProjectStacksRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    project_stacks = repo.get_all_project_stacks()
    return project_stacks


@router.put(
    "/api/project-stacks/{project_stack_id}",
    response_model=Union[ProjectStackOut, Error],
)
def update_project_stack(
    project_stack_id: int,
    project_stack: ProjectStackIn,
    repo: ProjectStacksRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, ProjectStackOut]:
    return repo.update_project_stack(project_stack_id, project_stack)


@router.delete("/api/project-stacks/{project_stack_id}", response_model=bool)
def delete_project_stack(
    project_stack_id: int,
    repo: ProjectStacksRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_project_stack(project_stack_id)


@router.get(
    "/api/project-stacks/{project_stack_id}",
    response_model=Optional[ProjectStackOut],
)
def get_project_stack(
    project_stack_id: int,
    response: Response,
    repo: ProjectStacksRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> ProjectStackOut:
    project_stack = repo.get_project_stack(project_stack_id)
    if project_stack is None:
        response.status_code = 404
        return None

    return project_stack


@router.post(
    "/api/project-stacks", response_model=Union[ProjectStackOut, Error]
)
def create_project_stack(
    project_stack: ProjectStackIn,
    response: Response,
    repo: ProjectStacksRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status_code = 200
    return repo.create_project_stack(project_stack)
