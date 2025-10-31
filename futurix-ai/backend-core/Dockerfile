FROM python:3.11-slim

WORKDIR /code

# Copy requirements and install Python packages
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the application code
COPY ./app /code/app
#COPY ./.env /code/.env

# Expose the port the app runs on
EXPOSE 8000

# Run the application
# We will eventually add Alembic migrations here
# CMD alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
