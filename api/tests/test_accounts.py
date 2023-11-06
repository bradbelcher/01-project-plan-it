from main import app
from fastapi.testclient import TestClient
from routers.accounts import AccountRepository
from authenticator import authenticator
from pydantic import BaseModel

client = TestClient(app)


class EmptyAccountQueries:
    def get_all_accounts(self):
        return []


class UserOut(BaseModel):
    username: str
    email: str


def fake_get_current_account_data():
    return UserOut(username="username", email="email@email.com")


def test_get_all_accounts():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[AccountRepository] = EmptyAccountQueries
    response = client.get("/api/accounts")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
