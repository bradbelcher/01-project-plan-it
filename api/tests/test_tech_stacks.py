from fastapi.testclient import TestClient
from main import app
from routers.tech_stacks import TechStacksRepository
from authenticator import authenticator
from pydantic import BaseModel

client = TestClient(app)


class EmptyTechStackQueries:
    @staticmethod
    def get_all_tech_stacks():
        return []


class UserOut(BaseModel):
    username: str
    email: str


def fake_get_current_account_data():
    return UserOut(username="username", email="email@gmail.com")


def test_get_all_tech_stacks():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[TechStacksRepository] = EmptyTechStackQueries

    response = client.get("/api/tech-stacks/")

    app.dependency_overrides = {}

    print(response.json())
    assert response.status_code == 200
    assert response.json() == []
