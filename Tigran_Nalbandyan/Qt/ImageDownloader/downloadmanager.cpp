#include "downloadmanager.h"

using namespace std;

DownloadManager::DownloadManager(QObject* parent) : QThread(parent)
{
}

void DownloadManager::doDownload()
{
    QNetworkAccessManager manager;
    QNetworkReply *response = manager.get(QNetworkRequest(QUrl(url)));
    QEventLoop event;
    connect(response, SIGNAL(downloadProgress(qint64, qint64)), this, SLOT(getDownloadData(qint64, qint64)) );
    connect(response, SIGNAL(finished()), &event, SLOT(quit()));
    event.exec();
    QByteArray content = response->readAll();
    emit sendImage(content);
//    qDebug() << content;
}

void DownloadManager::getDownloadData(qint64 read, qint64 total)
{
    int percent = int((double(read) / double(total)) * 100);
//    qDebug() << "Progress:" << percent;
    emit tick(percent);
}

void DownloadManager::run()  {
    this->doDownload();
}

void DownloadManager::setURL(QString newURL) {
    url = newURL;
}
