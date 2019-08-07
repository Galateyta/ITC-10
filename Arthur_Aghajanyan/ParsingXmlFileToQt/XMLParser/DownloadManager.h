#ifndef TIMER_H
#define TIMER_H
#include <QNetworkAccessManager>

class DownloadManager : public QObject
{
    Q_OBJECT
public:
    DownloadManager(QObject* parent);
    ~DownloadManager();

    void start(QString src,void* usrPtr);

signals:
    void finished(void* mUsrPtr, QByteArray data);


private slots:
    void slotDownloadFinished(QNetworkReply* reply);

private:
    QNetworkAccessManager manager;

};

#endif // TIMER_H
