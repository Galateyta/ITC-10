#ifndef TIMER_H
#define TIMER_H

#include <QThread>
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
    void startImageDownload(QString url, void* usrPtr);

    QByteArray imgDownloadFromServer(QString src);
signals:
    void finished(void* usrPtr, QByteArray data);
    void xmlfinished(void* usrPtr, QByteArray data);


private slots:
    void slotDownloadFinished(QNetworkReply* reply);

private:
    QNetworkAccessManager manager;
};

#endif // TIMER_H
