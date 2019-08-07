#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <cstdio>
#include <cstdlib>
#include <unistd.h>
#include <iostream>
#include <sstream>
#include <fstream>
#include <netdb.h>
#include <cstring>
#include <arpa/inet.h>


#define PORT 60000

void clientRun(char* hostname){
    char buf[256];
    struct sockaddr_in addr;
    int socketClient;
    socketClient = socket(AF_INET, SOCK_STREAM, 0);
    if(socketClient < 0)
    {
        perror("Socket Error");
        exit(1);
    }
    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT);
    addr.sin_addr.s_addr = htonl(INADDR_ANY); 

    if(connect(socketClient, (struct sockaddr *)&addr, sizeof(addr)) < 0)  {
        perror("Connect Error");
        exit(2);
    }
    while(1) {      
        std::cout << "Enter the message: " << std:: endl;
        fgets(buf, 256, stdin);
        send(socketClient, buf, 256, 0);
        int byte = recv(socketClient, buf, 1024, 0);
        printf(buf);
        if(byte < 0) break;
    }
}

void serverRun(char* hostname) {
    std::cout << "serverRunnn\n";
    int listenerSocket = socket(AF_INET, SOCK_STREAM, 0);
    int acceptSocet;
    char buf[1024]; 
    int bytes_read; 
    struct sockaddr_in addr;

    if(listenerSocket < 0) {
         perror("Socket Error");
         exit(1);
     }
    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT);
    addr.sin_addr.s_addr = INADDR_ANY;

    if(bind(listenerSocket, (struct sockaddr *)&addr, sizeof(addr)) < 0)  {
        perror("Bind Error");
        exit(2);

    }
    listen(listenerSocket, 1);
   
    while (1) {
        sockaddr_in clientInServer;
        socklen_t clientSize = sizeof(clientInServer);
        acceptSocet = accept(listenerSocket, (sockaddr *)&clientInServer, &clientSize);
        if(acceptSocet < 0) {
            perror("Accept Socket Error");
            exit(3);
        }
        while(1)
            {
                bytes_read = recv(acceptSocet, buf, 1024, 0);
                printf(buf);
                if(bytes_read <= 0) break;
                printf("Enter message");
                fgets(buf, 256, stdin);
                send(acceptSocet, buf, bytes_read, 0);
            }
    }
    close(listenerSocket);
}

int main(int argc, char* argv[]){
    std::string client_or_server (argv[2]);
    std::cout << client_or_server;

    if(client_or_server.compare("server") == 0) { 
        std::cout << 1;
        serverRun(argv[1]);
    } else if(client_or_server.compare("client") == 0) {
        clientRun(argv[1]);
    }
    return 0;
}