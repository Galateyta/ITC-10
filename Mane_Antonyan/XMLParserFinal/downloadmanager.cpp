#include "downloadmanager.h"

#include <unistd.h>
#include <QNetworkReply>
#include <QPixmap>
#include <QObjectUserData>
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

#define PORT 60005
#define PORT1 3490
#define BUFF 100000

DownloadManager::DownloadManager(QObject* parent) : QObject(parent)
{
    connect(&manager, SIGNAL(finished(QNetworkReply*)),
                SLOT(slotDownloadFinished(QNetworkReply*)));
}

DownloadManager::~DownloadManager()
{
}

QByteArray DownloadManager::serverRun()
{
    int listener = socket(AF_INET, SOCK_STREAM, 0);

    if (0 > listener)
    {
        perror("Problem with socket!");
        exit(1);
    }

    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(PORT1);
    addr.sin_addr.s_addr = htonl(INADDR_ANY);

    if (0 > bind(listener, (sockaddr*) &addr, sizeof(addr)))
    {
        perror("Cant bind!!!");
        exit(2);
    }

    listen(listener, 1);
    sockaddr_in client;
    socklen_t size = sizeof(client);
    int sock = accept(listener,(sockaddr*) &client, &size);
    close(listener);

    char host[NI_MAXHOST];
    char service[NI_MAXSERV];
    memset(host, 0, NI_MAXHOST);
    memset(service, 0, NI_MAXSERV);

    if (0 == getnameinfo((sockaddr*) &client, size, host, NI_MAXHOST, service, NI_MAXSERV, 0))
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
    while (true)
    {
        int bytesRead = recv(sock, buf, BUFF, 0);
        if (0 >= bytesRead)
        {
            break;
        }

        send(sock, buf, bytesRead, 0);
        close(sock);
        QByteArray bytes = QByteArray::fromRawData(buf, bytesRead);
        return  bytes;
    }

    close(sock);
    return nullptr;
}

void DownloadManager::clientRun(QString url)
{
    QString protocol = url.split("://")[0];
    QStringList urlList = url.split("/");
    QString ip = urlList[2];
    QStringList newList = urlList.mid(3, urlList.size());
    QString fileName = newList.join("/");

    if ("localhost" == ip)
    {
        ip = "127.0.0.1";
    }

    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (0 > sock)
    {
        perror("Problems with Ssocket!");
        exit(1);
    }

    sockaddr_in addr;
    addr.sin_family = AF_INET;
    if (protocol.simplified() != "ITC" )
    {
        fileName = "invalid.xml";
    }
    addr.sin_port = htons(PORT);

    QByteArray ipadd = ip.toLatin1();
    const char* ipByte = ipadd.data();
    addr.sin_addr.s_addr = inet_addr(ipByte);

    if (0 > ::connect(sock, (sockaddr*) &addr, sizeof(addr)))
    {
        perror("Connect");
        exit(1);
    }

    char buf[257];
    const char* urlChar = fileName.toLocal8Bit().data();
    int returnStatus = send(sock, urlChar, sizeof(buf), 0);
    if (0 > returnStatus)
    {
        perror("Can't send!!!");
    }

    returnStatus = recv(sock, buf, sizeof(buf), 0);
    if (0 > returnStatus)
    {
        perror("Can't receive!!!");
    }
    close(sock);
}

void DownloadManager::start(QString url)
{
    clientRun(url);
    QByteArray data = serverRun();
    emit xmlfinished(nullptr, data);
}

void DownloadManager::slotDownloadFinished(QNetworkReply* reply)
{
    QByteArray data = reply->readAll();
    emit finished(reply->userData(0), data);
}

void DownloadManager::startImage(QString url,void* usrPtr)
{
    QUrl qurl(url);
    QNetworkRequest request(qurl);
    QNetworkReply* reply = manager.get(request);
    QObjectUserData* data = static_cast<QObjectUserData*>(usrPtr);
    reply->setUserData(0, data);
}


