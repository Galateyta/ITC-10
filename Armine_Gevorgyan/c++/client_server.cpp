#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <iostream>
#include <sstream>
#include <fstream>
#include <cstdlib>
#include <netdb.h>
#include <cstring>
#include <cstdio>


#define BUFF 1024

void runServer(char* hostname, int port);
void runClient(char* hostname, int port);
int flag;

int main(int argc, char* argv[]) {

    if(3 > argc) {
        std::cout << "Enter IP address  and Port for server and port for client" << std::endl;
        exit(1);
    }else { 
        
        char* hostname = argv[1];
        int port = atoi(argv[2]);
        
        std::cout << "Run Server or Client ? Enter 1 for server , 2 for client : ";
        std::cin >> flag;
        switch(flag) {
            case 1: 
                runServer(hostname, port);
                break;

            case 2: {
                runClient(hostname, port);
                runServer(hostname, port + 1);
                break;
        }
            default:
                std::cout << "Error" << std::endl;
                break;
        }
        
    }
    return 0;
}

void runServer(char* hostname, int port) {

    sockaddr_in addr;

    int listener = socket(AF_INET, SOCK_STREAM, 0);
    if (0 > listener) {
        perror("Socket");
        exit(1);
    }

    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    addr.sin_addr.s_addr = INADDR_ANY;
    if (0 > bind(listener, (sockaddr*) &addr, sizeof(addr))) {
        perror("Bind");
        exit(2);
    }

    int num = listen(listener, SOMAXCONN);

    while (true) {
        sockaddr_in client;
        socklen_t clientSize = sizeof(client);
        int sock = accept(listener, (sockaddr*) &client, &clientSize);
        char host[1025];
        char service[32];

        memset(host, 0, 1025);
        memset(service, 0, 32);

        if(0 > sock) {
            perror("Accept");
            exit(3);
        }

        char buf[BUFF];

        switch(fork()) {
            case -1:
                perror("Fork");
                break;

            case 0: {
                close(listener);

                int readBuf = recv(sock, buf, BUFF, 0);
                if (0 >= readBuf ) {
                    break;
                }

                if (-1 == readBuf ) {
                    std::cerr << "Error in recv(). Quitting" << std::endl;
                    break;
                }

                if (0 == readBuf ) {
                    std::cout << "Client disconnected." << std::endl;
                    break;
                }

                std::cout << buf;
                send(sock, buf, readBuf , 0);

                close(sock);
                if(flag == 1) {
                    runClient(hostname, port + 1);
                }else {
                    runClient(hostname, port - 1);
                }
                exit(0);
            }
            default:
                close(sock);
        }
    }
    close(listener);

}

void runClient(char* hostname, int port) {

    std::cout << "Enter the message: " << std:: endl;

    char buf[256];
    fgets(buf, 256, stdin);

    int sock;
    sockaddr_in addr;

    sock = socket(AF_INET, SOCK_STREAM, 0);
    if(sock < 0) {
        perror("socket");
        exit(1);
    }

    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    if(0 >= inet_pton(AF_INET, "127.0.0.1", &addr.sin_addr))
    {
        perror("Invalid  IP address");
        exit(1);
    }
    if(0 > connect(sock, (sockaddr *)&addr, sizeof(addr)) ) {
        perror("connect");
        exit(2);
    }

    send(sock, buf, 256, 0);

}
