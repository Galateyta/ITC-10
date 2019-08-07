#include "filedownloader.h"

FileDownloader::FileDownloader(QUrl imageUrl, QObject *parent) :
 QObject(parent)
{
   connect(&m_WebCtrl, SIGNAL (finished(QNetworkReply*)), this, SLOT (fileDownloaded(QNetworkReply*)));
   QNetworkRequest request(imageUrl);
   QNetworkReply *reply = m_WebCtrl.get(request);
   connect(reply, SIGNAL(downloadProgress(qint64, qint64)), this, SLOT(getDownloadData(qint64, qint64)) );
}

FileDownloader::~FileDownloader()
{ }

void FileDownloader::fileDownloaded(QNetworkReply* pReply) {
   m_DownloadedData = pReply->readAll();
   pReply->deleteLater();
   emit downloaded();
}

QByteArray FileDownloader::downloadedData() const {
   return m_DownloadedData;
}
void FileDownloader::getDownloadData(qint64 read, qint64 total)
 {

     qint64 percent = (read / total) * 100;
     emit tick(percent);
 }
