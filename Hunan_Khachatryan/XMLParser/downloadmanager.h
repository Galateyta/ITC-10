#ifndef DOWNLOADMANAGER_H
#define DOWNLOADMANAGER_H

#include <QThread>
#include <QNetworkAccessManager>

class DownloadManager : public QObject
{
    Q_OBJECT
public:
    DownloadManager(QObject* parent);
    ~DownloadManager();

    void start();

signals:
    void progress(int percent);
    void finished(QByteArray data);


private slots:
    void slotDownloadFinished(QNetworkReply* reply);
    void slotDownloadProgress(qint64 current, qint64 total);

private:
    QNetworkAccessManager manager;

};

#endif // TIMER_H
