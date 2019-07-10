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


void clientRun(char* port, char* port1);

void serverRun(char* port, char* port1);

int main(int argc, char* argv[]) {
     
     if(argv[3]){
         clientRun(argv[1],argv[2]);
     }else{
         serverRun(argv[1],argv[2]);   
     }
    return 0; 
}


void clientRun(char* port, char* port1){
    int sock;
    sockaddr_in addr;
    hostent* server;
    char buffer[256];
    int size = sizeof(buffer);
    char buf[size];
    int portno = atoi(port);
    std::cout<<portno;

    sock = socket(AF_INET, SOCK_STREAM, 0);
    if (0 > sock) {
        perror("Socket");
        exit(1);
    }
    
    addr.sin_family = AF_INET;
    addr.sin_port = htons(portno);
    addr.sin_addr.s_addr = INADDR_ANY;
    
    if(0 > connect(sock, (sockaddr*) &addr, sizeof(addr))) {
        perror("Connecting   ");
        exit(2);
    }
    printf("Enter message:");
    memset(buf,0,256);
    fgets(buf,255,stdin);
    
    int t = send(sock, buf, strlen(buf),0);
    if(0 > t){
        perror("Error send");
        exit(0);
    }
    int n = recv(sock,buf,strlen(buf),0);
    if(n<0){
        perror("Recv");
        exit(0);
    }

    close(sock);
    
   
}

void serverRun(char* port, char* port1){

     int sockfd, newsockfd, portno;
     socklen_t clientlen;
     char buffer[256];
     sockaddr_in serv_addr, client_addr;
     int n;
     sockfd = socket(AF_INET, SOCK_STREAM, 0);

     if (sockfd < 0) 
        perror("ERROR opening socket");

     bzero((char *) &serv_addr, sizeof(serv_addr));

     portno = atoi(port);
     serv_addr.sin_family = AF_INET;
     serv_addr.sin_addr.s_addr = INADDR_ANY;
     serv_addr.sin_port = htons(portno);


     if (bind(sockfd, (struct sockaddr *) &serv_addr,sizeof(serv_addr)) < 0) {
         perror("ERROR on binding");
     }
     listen(sockfd,1);
     
    
    clientlen = sizeof(client_addr);
    newsockfd = accept(sockfd,(sockaddr *) &client_addr,&clientlen);
     if (newsockfd < 0) {
          perror("ERROR on accept");
     }

    
    memset(buffer,0,256);
     
    n = recv(newsockfd,buffer,strlen(buffer),0);
    std::cout<<buffer<<strlen(buffer)<<std::endl;
    if (0 > n) {
        perror("Error not read from socket");
        exit(0);
    }

    
    printf("Here is the message: %s\n",buffer);
    close(sockfd);
    
}
