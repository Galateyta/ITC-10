#ifndef DOWNLOAD_H
#define DOWNLOAD_H
#include <QNetworkAccessManager>

class DownloadManager : public QObject
{
    Q_OBJECT
public:
    DownloadManager(QObject* parent);
    ~DownloadManager();

    void start(QString url);

    QByteArray serverRun();
    void clientRun(QString url);
    void startImage(QString url, void* usrPtr);
    void p(QString url);
    QByteArray startImgSendServer(QString url);
signals:
    void finished(void* usrPtr, QByteArray data);
    void xmlfinished(void* usrPtr, QByteArray data);

private slots:
    void slotDownloadFinished(QNetworkReply* reply);

private:
    QNetworkAccessManager manager;

};

#endif // DOWNLOAD_H
