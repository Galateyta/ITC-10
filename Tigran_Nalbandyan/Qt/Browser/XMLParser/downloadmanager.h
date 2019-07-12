#ifndef DOWNLOADMANAGER_H
#define DOWNLOADMANAGER_H

#include <QNetworkAccessManager>

class DownloadManager : public QObject
{
    Q_OBJECT
public:
    DownloadManager(QObject* parent);
    ~DownloadManager();

    void start(QString url, void* usrPtr);
    QByteArray runServer();
    void runClient(QString url);

    void startImageDownload(QString url, void *usrPtr);
    QByteArray getImage(QString url);
signals:
    void finished(void* usrPtr, QByteArray data);
    void xmlFinished(void* usrPtr, QByteArray data);

private slots:
    void slotDownloadFinished(QNetworkReply* reply);

private:
    QNetworkAccessManager manager;
};

#endif // DOWNLOADMANAGER_H
