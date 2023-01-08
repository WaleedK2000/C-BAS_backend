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


@api_view(['GET'])
def executeExploit(request):

    response = {}
    
    client = docker.from_env()
    con = False
    try:
        con = client.containers.get("jolly_babbage")
    except:
        response = {"error": "No Container Found" }
        return Response(response)
    else:

        con.exec_run('apt-get update')
        con.exec_run('apt-get install docker.io -y')

        res = con.exec_run('docker ps')

        print(res.output)

        subs = 'CONTAINER ID'

        ter = str(res.output, 'UTF-8')

        print(type(ter))
        result =  subs in ter
 
        response = {"status": "Container Found",
            "RES": result,
            "m": ter
         }
        return Response(response)





