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
    QByteArray serverRun();
    void clientRun(QString url);
    void startImage(QString url, void* usrPtr);
    void getImageFromServer(QString url,void* usrPtr);

signals:
    void finished(void* usrPtr, QByteArray data);
    void xmlfinished(void* usrPtr, QByteArray data);
    void imageFinished(void* usrPtr, QByteArray data);

private slots:
    void slotDownloadFinished(QNetworkReply* reply);

private:
    QNetworkAccessManager manager;
};

#endif // DOWNLOADMANAGER_H
