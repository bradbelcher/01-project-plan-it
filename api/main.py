from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import (
    accounts,
    projects,
    tech_stacks,
    attendees,
    project_stacks,
    user_stacks,
)

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(projects.router)
app.include_router(attendees.router)
app.include_router(tech_stacks.router)
app.include_router(project_stacks.router)
app.include_router(user_stacks.router)

origins = [
    os.environ.get("CORS_HOST"),
    "http://localhost:3000",
    "https://planiteers.gitlab.io",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}
