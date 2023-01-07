#Installation Guide

## Prerequites

To follow this guide make sure you have installed python and pip. Also ensure docker is installed and running on your machine. Make sure you have permission to access docker by using the following command:

```console
    docker ps
```

## Installing Django

Open a terminal and run.

```console
    pip install Django
    pip install djangorestframework
    pip install django-cors-headers
    pip install docker
```

## Running the app

To run the server run the following command.

```console
python manage.py runserver 0.0.0.0:8000
```
