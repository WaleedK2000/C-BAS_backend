from rest_framework.response import Response
from rest_framework.decorators import api_view

import docker


@api_view(['GET'])
def getData(request):

    client = docker.from_env()
    lis = client.containers.list()

    containerList = []
    

    dictContainer = {}
    if len(lis) > 0:

        for container in lis:
            dictContainer[container.name] = container.attrs


    response = {"running ": len(lis), "error": "none", "data":dictContainer }

    person = {'name': 'Dennis', 'age': 28}
    return Response(response)