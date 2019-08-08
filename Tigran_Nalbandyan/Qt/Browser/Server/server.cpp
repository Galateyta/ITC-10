#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#include <iostream>
#include <sstream>
#include <fstream>
#include <unistd.h>
#include <cstdlib>
#include <cstdio>
#include <netdb.h>
#include <cstring>

#define PORT 60005
#define PORT1 50001
#define BUFF 1024

void readFile(int, char *);
void clientRun(char *, char *);

int main()
{
    sockaddr_in addr;

    int listener = socket(AF_INET, SOCK_STREAM, 0);
    if (0 > listener)
    {
        perror("Socket");
        exit(1);
    }

    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT);
    addr.sin_addr.s_addr = INADDR_ANY;

    if (0 > bind(listener, (sockaddr *)&addr, sizeof(addr)))
    {
        perror("Bind");
        exit(2);
    }
    listen(listener, SOMAXCONN);

    while (true)
    {
        sockaddr_in client;
        socklen_t clientSize = sizeof(client);
        int sock = accept(listener, (sockaddr *)&client, &clientSize);
        char host[NI_MAXHOST];
        char service[NI_MAXSERV];

        memset(host, 0, NI_MAXHOST);
        memset(service, 0, NI_MAXSERV);

        if (0 == getnameinfo((sockaddr *)&client, sizeof(client), host, NI_MAXHOST, service, NI_MAXSERV, 0))
        {
            std::cout << host << " connected on port " << service << std::endl;
        }
        else
        {
            inet_ntop(AF_INET, &client.sin_addr, host, NI_MAXHOST);
            std::cout << host << " connected on port " << ntohs(client.sin_port) << std::endl;
        }

        if (0 > sock)
        {
            perror("Accept");
            exit(3);
        }

        char buf[BUFF];

        switch (fork())
        {
        case -1:
            perror("Fork");
            break;

        case 0:
            close(listener);
            while (true)
            {
                int bytesRead = recv(sock, buf, BUFF, 0);
                if (0 >= bytesRead)
                {
                    break;
                }

                if (-1 == bytesRead)
                {
                    std::cerr << "Error in recv(). Quitting" << std::endl;
                    break;
                }

                if (0 == bytesRead)
                {
                    std::cout << "Client disconnected." << std::endl;
                    break;
                }

                std::cout << buf;
                send(sock, buf, bytesRead, 0);
            }

            close(sock);
            clientRun(buf, host);
            exit(0);

        default:
            close(sock);
        }
    }
    close(listener);
    return 0;
}

void readFile(int sock, char *fileName)
{
    FILE *hFile;
    hFile = fopen(fileName, "rb");
    if (!hFile)
    {
        hFile = fopen("error.xml", "rb");
    }
    char buffer[200000];
    int size = 0;
    char tmp = '\0';
    int i = 0;
    while (size = fread(&tmp, 1, 1, hFile) > 0)
    {
        buffer[i++] = tmp;
    }
    send(sock, buffer, i, 0);
}

void clientRun(char *fileName, char *host)
{
    char buffer[256];
    int size = sizeof(buffer);
    char buf[size];
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (0 > sock)
    {
        perror("Socket");
        exit(1);
    }

    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT1);
    std::cout << host;
    if (strcmp("127.0.0.1", host) == 0 || strcmp("localhost", host) == 0)
    {
        addr.sin_addr.s_addr = htonl(INADDR_ANY);
    }
    else
    {
        addr.sin_addr.s_addr = inet_addr(host);
    }

    if (0 > connect(sock, (sockaddr *)&addr, sizeof(addr)))
    {
        close(sock);
        clientRun(fileName, host);
        return;
    }
    readFile(sock, fileName);
    close(sock);
}