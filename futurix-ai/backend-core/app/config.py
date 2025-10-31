from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    DATABASE_URL: str
    SHIVAAY_API_KEY: str
    EXTRACTION_URL: str
    
    class Config:
        env_file = ".env" # Specify the env file
        env_file_encoding = 'utf-8'

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
