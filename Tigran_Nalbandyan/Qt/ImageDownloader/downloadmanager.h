#ifndef DOWNLOADMANAGER_H
#define DOWNLOADMANAGER_H

#include <QUrl>
#include <QtNetwork/QNetworkAccessManager>
#include <QtNetwork/QNetworkRequest>
#include <QtNetwork/QNetworkReply>
#include <QFile>
#include <QFileInfo>
#include <QEventLoop>
#include <QDebug>
#include <QThread>

class DownloadManager : public QThread
{
    Q_OBJECT
    QNetworkAccessManager manager;
    QVector<QNetworkReply *> currentDownloads;

public:
    DownloadManager(QObject* parent);
    void setURL(QString url);

public slots:
    void getDownloadData(qint64 read, qint64 total);

private:
    QThread thread;
    QString url;
    void doDownload();
    void run() override;
    void stop();

signals:
    void tick(int value);
    void sendImage(QByteArray data);
};

#endif // DOWNLOADMANAGER_H
