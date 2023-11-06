from fastapi.testclient import TestClient
from main import app
from routers.attendees import AttendeeRepo
from authenticator import authenticator
from pydantic import BaseModel
from queries.attendees import AttendeeIn, AttendeeOut

client = TestClient(app)


class EmptyAttendeeRepo:
    def get_all_project_attendees(self):
        return []

    @staticmethod
    def create(attendee: AttendeeIn):
        return AttendeeOut(
            id=1,
            project_id=attendee.project_id,
            account_id=attendee.account_id,
        )


class UserOut(BaseModel):
    username: str
    email: str


def fake_get_current_account_data():
    return UserOut(username="username", email="email@gmail.com")


# Test for get_project_attendees endpoint
def test_get_all_attendees():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[AttendeeRepo] = EmptyAttendeeRepo

    response = client.get("/api/attendees/")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


# Test for create_attendee endpoint
def test_create_attendee():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[AttendeeRepo] = EmptyAttendeeRepo

    test_attendee = AttendeeIn(project_id=1, account_id=2)
    response = client.post("/api/attendees", json=test_attendee.dict())

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"id": 1, "project_id": 1, "account_id": 2}
