#include "downloadmanager.h"
#include <QNetworkReply>
#include <QPixmap>

DownloadManager::DownloadManager(QObject* parent) : QObject(parent) // in this case the parent is MainWindow(this)
{
    connect(&manager, SIGNAL(finished(QNetworkReply*)),
                SLOT(slotDownloadFinished(QNetworkReply*)));
}

DownloadManager::~DownloadManager()
{

}

void DownloadManager::start(QString url, void* usrPtr)
{
    QUrl qurl(url);
    QNetworkRequest request(qurl);
    QNetworkReply* reply = manager.get(request);
    QObjectUserData * data = static_cast<QObjectUserData*>(usrPtr);
    reply->setUserData(0, data);
}

void DownloadManager::slotDownloadFinished(QNetworkReply* reply)
{
    QByteArray data = reply->readAll();
    emit finished(reply->userData(0), data);
}
