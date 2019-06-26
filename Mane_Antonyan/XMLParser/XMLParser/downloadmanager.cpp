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

void DownloadManager::start()
{
    QNetworkRequest request(QUrl("https://www.nasa.gov/sites/default/files/thumbnails/image/tyuleniy_oli_2016097_lrg_a.jpg"));
    QNetworkReply* reply = manager.get(request);
    connect(reply, SIGNAL(downloadProgress(qint64, qint64)),
            this, SLOT(slotDownloadProgress(qint64, qint64)));

}

void DownloadManager::slotDownloadFinished(QNetworkReply* reply)
{
    int statusCode = reply->attribute(QNetworkRequest::HttpStatusCodeAttribute).toInt();
    QByteArray data = reply->readAll();
    emit finished(data);
}

void DownloadManager::slotDownloadProgress(qint64 current, qint64 total)
{
    int percent = (current / (double)total) * 100;
    emit progress(percent);
}
