#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <cstdio>
#include <cstdlib>
#include <unistd.h>
#include <cstring>
#include <arpa/inet.h>
#include <netdb.h>
#include <iostream>

#define ZERO 0
#define PORT 60000
#define PORT1 50001
void serverRun(){
    int sock, listener;
    struct sockaddr_in addr;
    char buf[1024];
    int bytes_read;

    listener = socket(AF_INET, SOCK_STREAM, 0);
    if(listener < 0)
    {
        perror("socket");
        exit(1);
    }

    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT1);
    addr.sin_addr.s_addr = htonl(INADDR_ANY);
    if(bind(listener, (struct sockaddr *)&addr, sizeof(addr)) < 0)
    {
        perror("bind");
        exit(2);
    }

    listen(listener, 1);

    while(1)
    {
        sockaddr_in client;
        socklen_t clientSize = sizeof(client);
        sock = accept(listener,(sockaddr *)&client, &clientSize);
        char host[NI_MAXHOST];
        char service[NI_MAXSERV];

        memset(host, ZERO, NI_MAXHOST);
        memset(service, ZERO, NI_MAXSERV);

        if (ZERO == getnameinfo((sockaddr *)&client, sizeof(client), host, NI_MAXHOST, service, NI_MAXSERV, ZERO)) {
            std::cout << host << " connected on port " << service << std::endl;
        } else {
            inet_ntop(AF_INET, &client.sin_addr, host, NI_MAXHOST);
            std::cout << host << " connected on port " << ntohs(client.sin_port) << std::endl;
        }

        if(sock < 0)
        {
            perror("accept");
            exit(3);
        }

        while(1)
        {
            bytes_read = recv(sock, buf, 1024, 0);
            if(bytes_read <= 0) break;
            send(sock, buf, bytes_read, 0);
             std::string f = std::string(buf, ZERO, bytes_read);
             std::cout << f << std::endl;

        }
        close(sock);
    }
}
void clientRun(){
    
    char buffer[256];

    char buf[sizeof(buffer)];
    int sock,returnStatus;
    struct sockaddr_in addr;
    sock = socket(AF_INET, SOCK_STREAM, ZERO);
    if(sock < ZERO)
    {
        perror("socket");
        exit(1);
    }

    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT);
    addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
    if(connect(sock, (struct sockaddr *)&addr, sizeof(addr)) < ZERO)
    {
        perror("connect");
        exit(2);
    }
    printf("Please enter the message:\n");
    fgets(buffer,255,stdin);

    returnStatus = send(sock, buffer, sizeof(buffer), ZERO);
    if (returnStatus < ZERO){
        perror("send");
    }
    returnStatus = recv(sock, buf, sizeof(buffer), ZERO);
    if (returnStatus < ZERO){
        perror("recv");
    }

    printf("%s\n",buf);
    close(sock);
}
int main()
{
    clientRun();
    serverRun();
    return 0;
}
