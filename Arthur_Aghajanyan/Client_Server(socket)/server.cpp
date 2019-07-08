#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <iostream>
#include <sstream>
#include <fstream>
#include <unistd.h>
#include <cstdlib>
#include <cstdlib>
#include <cstdio> 
#include <netdb.h>
#include <cstring>

#define ZERO 0
#define STATUS -1
#define PORT 60005
#define PORT1 50001
#define BUFF 1024

void readFile(int, char*);
void clientRun(char*);

int main() {
    sockaddr_in addr;
    
    int listener = socket(AF_INET, SOCK_STREAM, ZERO);
    if (ZERO > listener) {
        perror("Socket");
        exit(1);
    }

    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT);
    addr.sin_addr.s_addr = INADDR_ANY;
    
    if (ZERO > bind(listener, (sockaddr*) &addr, sizeof(addr))) {
        perror("Bind");
        exit(2);
    }
    listen(listener, 1);
    
    while (true) {
        sockaddr_in client;
        socklen_t clientSize = sizeof(client);
        int sock = accept(listener, (sockaddr*) &client, &clientSize);
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

        if(ZERO > sock) {
            perror("Accept");
            exit(3);
        }
        
        char buf[BUFF];

        switch(fork()) {
            case STATUS:
                perror("Fork");
                break;
            
            case ZERO:
                close(listener);
                while (true) {
                    int bytesRead = recv(sock, buf, BUFF, ZERO);
                    if (ZERO >= bytesRead) {
                        break;
                    }
                
                    if (STATUS == bytesRead) {
                        std::cerr << "Error in recv(). Quitting" << std::endl;
                        break;
                    }

                    if (ZERO == bytesRead) {
                        std::cout << "Client disconnected." << std::endl;
                        break;
                    }

                    std::cout << buf;
                    send(sock, buf, bytesRead, 0);
                }

                close(sock);
                clientRun(buf);
                exit(0);
        
            default:
                close(sock);
        }
    }
    
    close(listener);
    return 0;
}

void readFile(int sock, char* t){
    std::fstream fin;
    fin.open(t);

    if (!fin.is_open()) {
        fin.open("error.xml");
    }

    std::string str = "";
    std::string line = "";
    while (getline(fin, line)) {
        if (ZERO != line.compare("")) {
            str += line;
        }
    }
    fin.close();
    
    std::stringstream response;
    std::stringstream responseBody;
    responseBody << str;
    response << responseBody.str();

    send(sock, response.str().c_str(), response.str().length(), ZERO);
}

void clientRun(char* t){
    char buffer[256];
    int size = sizeof(buffer);
    char buf[size];
    int sock = socket(AF_INET, SOCK_STREAM, ZERO);
    if (ZERO > sock) {
        perror("Socket");
        exit(1);
    }

    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT1);
    addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
    
    if(ZERO > connect(sock, (sockaddr*) &addr, sizeof(addr))) {
        perror("Connecting");
        exit(2);
    }

    readFile(sock,t);
    close(sock);
}
