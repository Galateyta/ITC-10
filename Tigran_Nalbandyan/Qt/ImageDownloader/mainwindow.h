#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include "downloadmanager.h"
#include <QImage>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void onStartClick();
    void onDownloadTick(int value);
    void onDownloadComplete(QByteArray data);

private:
    Ui::MainWindow *ui;
    DownloadManager* dManager;
    QImage image;
};

#endif // MAINWINDOW_H
