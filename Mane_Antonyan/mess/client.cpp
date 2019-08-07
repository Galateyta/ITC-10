#include "header.hpp"
#include <stdio.h> 
#include <sys/socket.h> 
#include <arpa/inet.h> 
#include <unistd.h> 
#include <string.h> 
#include <iostream>
#include <string>
#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <iostream>
#include <sstream>
#include <cstdlib>
#include <cstdio> 
#include <netdb.h>
#include <cstring>

#include "header.hpp"

void startClient(std::string address, int port) {
    char buffer[1024] = {0};
    int sock = socket(AF_INET, SOCK_STREAM, 0); 
    
    if (sock < 0) { 
        std::cerr <<  "Problem with socket!" << std::endl;
    }

    sockaddr_in addr;
    addr.sin_family = AF_INET; 
    addr.sin_port = htons(port); 
    addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
   
    if (connect(sock, (sockaddr*)&addr, sizeof(addr)) < 0) {
        std::cerr << "Connection Failed!!!" << std::endl;
    }

    connect(sock, (sockaddr*)&addr, sizeof(addr));
    std::string msg = "";
    std::cout << "Enter the message: ";
    std::getline(std::cin, msg);
    send(sock , msg.c_str() , msg.length(), 0 );

    close(sock);
}

void startServer(int port) {
    int listener = socket(AF_INET, SOCK_STREAM, 0);
    if (0 > listener) {
        std::cerr << "Error with socket!!!" << std::endl;
    }

    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    addr.sin_addr.s_addr = htonl(INADDR_ANY);
    if (0 > bind(listener, (sockaddr*) &addr, sizeof(addr))) {
        std::cerr << "Bind error!!!" << std::endl;
    }

    listen(listener, 1);

        int size = sizeof(addr);
            
        while (true) {
            int sock = accept(listener, (sockaddr*)&addr, (socklen_t*)&size);
            char buf[1024];
            if (0 > sock) {
                std::cerr << "Accept" << std::endl;
            }
            while(true){
                int bytesRead = recv(sock, buf, 1024, 0);
                if (0 >= bytesRead) {
                    break;
                }
                std::string message(buf, 0, bytesRead);
                std::cout << message << std::endl;
                startClient("127.0.0.1", port + 1);
            }
            close(sock);
       }
       close(listener);
}

int main() {
    int port = 10000;
    std::string address = "127.0.0.1";
    startClient(address, port);
    startServer(port + 1);
    return 0;
}
