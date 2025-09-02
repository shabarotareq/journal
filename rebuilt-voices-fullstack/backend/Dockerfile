
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY app /app/app
RUN mkdir -p /app/uploads
ENV PYTHONUNBUFFERED=1

CMD ["python", "app/main.py"]
