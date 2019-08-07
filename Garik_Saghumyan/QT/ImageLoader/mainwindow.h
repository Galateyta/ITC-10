#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include "filedownloader.h"


namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
signals:
    void tick(int value);
private slots:
 void loadImage();
// void onDownloadClick();
 void onDownloadTick(int value);

private:
    Ui::MainWindow *ui;
    FileDownloader *m_pImgCtrl;
};



#endif // MAINWINDOW_H
