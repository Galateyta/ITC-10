#include <iostream>
#include <unistd.h>
#include <sys/types.h>
#include <stdio.h> 
#include <sys/socket.h> 
#include <stdlib.h> 
#include <netinet/in.h> 
#include <string.h> 
#include <arpa/inet.h>

void clientRun(int port){

    int sock = 0, valread; 
    struct sockaddr_in serv_addr; 
    
    char buffer[1024] = {0}; 
    sock = socket(AF_INET, SOCK_STREAM, 0);
    
    struct sockaddr_in addr;

    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
    if(connect(sock, (struct sockaddr *)&addr, sizeof(addr)) < 0)
    {
        perror("connect");
        exit(2);
    }


    connect(sock, (struct sockaddr *)&addr, sizeof(addr));
    std::string my_message;
    std::cout << "enter message : ";
    std::getline(std::cin, my_message);
    const char* hello = my_message.c_str();
    
    send(sock , hello , strlen(hello) , 0 );
    close(sock);
}

void serverRun(int port_s, int port_c){
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    
    struct sockaddr_in address;
    int addrlen = sizeof(address); 

    address.sin_family = AF_INET; 
    address.sin_addr.s_addr = htonl(INADDR_ANY); 
    address.sin_port = htons( port_s ); 


    int bind_val = bind(server_fd, (struct sockaddr *)&address, sizeof(address));

    int listener = listen(server_fd, 1);

    char buffer[1024]; 
    int new_socket, valread; 
    const char* hello;

    while(true){
        new_socket = accept(server_fd, (struct sockaddr *)&address,(socklen_t*)&addrlen);
        while(true){
            valread = recv( new_socket , buffer, 1024, 0);
            if(valread <= 0) break;
            std::cout << "from server : " <<buffer << std::endl; 
            clientRun(port_c);
        }
        close(new_socket);
    }

    close(server_fd);
}

int main(int argc,const char* argv[]) 
{
    int mod, port_s, port_c;
    mod = atoi(argv[3]);
    port_s = atoi(argv[1]);
    port_c = atoi(argv[2]);

    if(mod == 1){
        clientRun(port_c);
    }
    serverRun(port_s, port_c);
    
    return 0;
}
