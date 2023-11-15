FROM --platform=linux/amd64 python:3.11-bullseye

# Set the working directory
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt /app

# Install the requirements
RUN pip3 install -r requirements.txt

# Copy the entire project to the working directory
COPY . /app


# Run the migrations and start the server
CMD ["python3","main.py"]
