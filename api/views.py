from rest_framework.response import Response
from rest_framework.decorators import api_view

import docker


@api_view(['GET'])
def getData(request):

    client = docker.from_env()
    lis = client.containers.list()

    

    dictContainer = {}
    if len(lis) > 0:

        for container in lis:

            # dictContainer[container.name] = {'id': container.id, 'status': container.status, 'labels': container.labels, 'image': container.attrs}
            dictContainer[container.name] = container.attrs

    # for image in client.images.list():

    response = {"running ": len(lis), "error": "none", "data":dictContainer }

    person = {'name': 'Dennis', 'age': 28}
    return Response(response)