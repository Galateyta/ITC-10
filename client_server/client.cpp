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
#define BUFF 1024

void serverRun();
void clientRun();

int main() {
    clientRun();
    serverRun();

    return 0;
}

void serverRun() {
    char buf[BUFF];
    int listener = socket(AF_INET, SOCK_STREAM, ZERO);
    
    if (ZERO > listener) {
        perror("Socket");
        exit(1);
    }

    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT1);
    addr.sin_addr.s_addr = htonl(INADDR_ANY);
    if (ZERO > bind(listener, (sockaddr*) &addr, sizeof(addr))) {
        perror("Bind");
        exit(2);
    }
    listen(listener, 1);

        sockaddr_in client;
        socklen_t clientSize = sizeof(client);
        int sock = accept(listener,(sockaddr *)&client, &clientSize);
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

        if (ZERO > sock) {
            perror("Accept");
            exit(3);
        }

        while (true) {
            int bytesRead = recv(sock, buf, BUFF, 0);
            if (ZERO >= bytesRead) {
                break;
            }
            send(sock, buf, bytesRead, 0);
            std::string fileName(buf, ZERO, bytesRead);
            std::cout << fileName << std::endl;
        }
        close(sock);
}

void clientRun() {
    char buffer[256];
    int size = sizeof(buffer);
    char buf[size];
    int sock = socket(AF_INET, SOCK_STREAM, ZERO);
    
    if(ZERO > sock) {
        perror("Socket");
        exit(1);
    }
    
    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT);
    addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
    
    if (ZERO > connect(sock, (sockaddr*) &addr, sizeof(addr))) {
        perror("Connect");
        exit(2);
    }

    //std::cout << "Please enter the message: " << std::endl;
    //fgets(buffer, 255, stdin);

    int returnStatus = send(sock, buffer, sizeof(buffer), ZERO);
    if (ZERO > returnStatus) {
        perror("Send");
    }

    returnStatus = recv(sock, buf, sizeof(buffer), ZERO);
    if (ZERO > returnStatus) {
        perror("Recv");
    }

    std::cout << "Buf: " << buf << std::endl;
    close(sock);
}
