#include <iostream>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <cstdlib>
#include <cstdio> 
#include <netdb.h>
#include <cstring>


void clientRun(char* port);

void serverRun(char* port);

int main(int argc, char* argv[]) {
     
     if(argv[2]){ std::cout<<"kaaaa";
         clientRun(argv[1]);
     }else{
         serverRun(argv[1]);   
     }
    return 0; 
}


void clientRun(char* port){
    int sock, portno;
    struct sockaddr_in addr;
    char message[128];
    char buf[sizeof(message)];
    portno = atoi(port);
    sock = socket(AF_INET, SOCK_STREAM, 0);
    if(sock < 0)
    {
        perror("socket");
        exit(1);
    }

    addr.sin_family = AF_INET;
    addr.sin_port = htons(portno); 
    addr.sin_addr.s_addr = htonl(INADDR_ANY);
    if(connect(sock, (struct sockaddr *)&addr, sizeof(addr)) < 0)
    {
        perror("connect");
        exit(2);
    }
    while(1){
    memset(message,0,128);
    printf("Please enter the message: ");
    fgets(message,128,stdin);
    send(sock, message, sizeof(message), 0);
    recv(sock, buf, sizeof(message), 0);
    printf(buf);
    }
    close(sock);
}

void serverRun(char* port){

    int sock, listener,portno;
    struct sockaddr_in addr;
    char buf[1024];
    int bytes_read;
    portno = atoi(port);


    listener = socket(AF_INET, SOCK_STREAM, 0);
    if(listener < 0)
    {
        perror("socket");
        exit(1);
    }
    
    addr.sin_family = AF_INET;
    addr.sin_port = htons(portno);
    addr.sin_addr.s_addr = htonl(INADDR_ANY);
    if(bind(listener, (struct sockaddr *)&addr, sizeof(addr)) < 0)
    {
        perror("bind");
        exit(2);
    }

    listen(listener, 1);
    
    while(1)
    {
        sock = accept(listener, NULL, NULL);
        if(sock < 0)
        {
            perror("accept");
            exit(3);
        }

        while(1)
        {
            bytes_read = recv(sock, buf, 1024, 0);
        printf(buf);

        printf("Please enter the message: ");
        bzero(buf,0.128);
        fgets(buf,128,stdin);
            if(bytes_read <= 0) break;
            send(sock, buf, bytes_read, 0);
        }
    
        close(sock);
    }
    
}
