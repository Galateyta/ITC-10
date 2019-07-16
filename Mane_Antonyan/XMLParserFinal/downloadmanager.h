#ifndef DOWNLOADMANAGER_H
#define DOWNLOADMANAGER_H

#include <QNetworkAccessManager>

class DownloadManager : public QObject
{
    Q_OBJECT
public:
    DownloadManager(QObject*);
    ~DownloadManager();

    void start(QString);
    QByteArray serverRun();
    void clientRun(QString);
    void startImage(QString, void*);
    void p(QString);
    QByteArray startImgSendServer(QString);

signals:
    void finished(void*, QByteArray);
    void xmlfinished(void*, QByteArray);

private slots:
    void slotDownloadFinished(QNetworkReply*);

private:
    QNetworkAccessManager manager;
};

#endif
