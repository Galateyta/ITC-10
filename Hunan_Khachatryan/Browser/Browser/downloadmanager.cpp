#include "downloadmanager.h"
#include <QObjectUserData>
#include <QNetworkReply>
#include <unistd.h>
#include <QPixmap>
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


#define PORT 60004
#define PORT1 50001
#define BUFF 10000

DownloadManager::DownloadManager(QObject* parent) : QObject(parent)
{
    connect(&manager, SIGNAL(finished(QNetworkReply*)),
                SLOT(slotDownloadFinished(QNetworkReply*)));
}

DownloadManager::~DownloadManager()
{

}

void DownloadManager::start(QString url, void* usrPtr)
{
    clientRun(url);
//    std::string data = serverRun();
//    QByteArray byteData(data.c_str(), data.length());
    QByteArray byteData = serverRun();
    emit xmlfinished(nullptr, byteData);

}
void DownloadManager::startImage(QString url, void* usrPtr)
{
    QUrl qurl(url);
    QNetworkRequest request(qurl);
    QNetworkReply* reply = manager.get(request);
    QObjectUserData* data = static_cast<QObjectUserData*>(usrPtr);
    reply->setUserData(0, data);
}
void DownloadManager::slotDownloadFinished(QNetworkReply* reply)
{
    QByteArray data = reply->readAll();
    emit finished(reply->userData(0), data);
}


QByteArray  DownloadManager::serverRun() {
    char buf[BUFF];
    int listener = socket(AF_INET, SOCK_STREAM, 0);

    if (0 > listener) {
        perror("Socket");
        exit(1);
    }

    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT1);
    addr.sin_addr.s_addr = htonl(INADDR_ANY);
    if (0 > bind(listener, (sockaddr*) &addr, sizeof(addr))) {
        perror("Bind");
        exit(2);
    }
    listen(listener, 1);

        sockaddr_in client;
        socklen_t clientSize = sizeof(client);
        int sock = accept(listener,(sockaddr *)&client, &clientSize);
        close(listener);

        char host[NI_MAXHOST];
        char service[NI_MAXSERV];
        memset(host, 0, NI_MAXHOST);
        memset(service, 0, NI_MAXSERV);

        if (0 == getnameinfo((sockaddr *)&client, sizeof(client), host, NI_MAXHOST, service, NI_MAXSERV, 0)) {
            std::cout << host << " connected on port " << service << std::endl;
        } else {
            inet_ntop(AF_INET, &client.sin_addr, host, NI_MAXHOST);
            std::cout << host << " connected on port " << ntohs(client.sin_port) << std::endl;
        }

        if (0 > sock) {
            perror("Accept");
            exit(3);
        }
        while (true) {
            int bytesRead = recv(sock, buf, BUFF, 0);
            if (0 >= bytesRead) {
                break;
            }
            send(sock, buf, bytesRead, 0);
            //std::string fileName(buf, 0, bytesRead);

            QByteArray fileName;
            fileName = QByteArray(buf, strlen(buf));
            close(sock);
            return  fileName;
        }
        close(sock);
        return nullptr;
}

void DownloadManager::clientRun(QString url) {
    char buffer[256];
    int size = sizeof(buffer);
    char buf[size];
    int sock = socket(AF_INET, SOCK_STREAM, 0);

    if(0 > sock) {
        perror("Socket");
        exit(1);
    }
    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT);
    addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);

    if (0 > ::connect(sock, (sockaddr*) &addr, sizeof(addr))) {
        perror("Connect");
        exit(2);
    }
    url+=".xml";
    QByteArray ba = url.toLocal8Bit();
    const char* urlChar = ba.data();
     
    int returnStatus = send(sock, urlChar, sizeof(buffer), 0);
    if (0 > returnStatus) {
        perror("Send");
    }

    returnStatus = recv(sock, buf, sizeof(buffer), 0);
    if (0 > returnStatus) {
        perror("Recv");
    }
     close(sock);
}

