from fastapi.testclient import TestClient
from main import app
from routers.projects import ProjectQueries
from authenticator import authenticator
from pydantic import BaseModel

client = TestClient(app)


class EmptyProjectQueries:
    @staticmethod
    def get_all_projects():
        return []


class UserOut(BaseModel):
    username: str
    email: str


def fake_get_current_account_data():
    return UserOut(username="username", email="email@gmail.com")


def test_get_all_projects():

    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    app.dependency_overrides[ProjectQueries] = EmptyProjectQueries

    response = client.get("/api/projects")

    app.dependency_overrides = {}

    print(response.json())
    assert response.status_code == 200
    assert response.json() == []
