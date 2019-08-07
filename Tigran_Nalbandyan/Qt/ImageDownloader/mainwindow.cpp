#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

//    QString url = "https://mirrors.tuna.tsinghua.edu.cn/qt/archive/online_installers/3.1/qt-unified-windows-x86-3.1.1-online.exe";
    QString url = "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?cs=srgb&dl=astronomy-dolomites-evening-1624496.jpg&fm=jpg";
    dManager = new DownloadManager(this);
    connect(dManager, SIGNAL(tick(int)), this, SLOT(onDownloadTick(int)));
    connect(dManager, SIGNAL(sendImage(QByteArray)), this, SLOT(onDownloadComplete(QByteArray)));
    connect(ui->downloadButton, SIGNAL(clicked()), this, SLOT(onStartClick()));
}

void MainWindow::onStartClick() {
    ui->progressBar->setValue(0);
    QString url = ui->url->text();
    dManager->setURL(url);
    dManager->start();
}

void MainWindow::onDownloadTick(int value) {
    ui->progressBar->setValue(value);
}

void MainWindow::onDownloadComplete(QByteArray data) {
    QImage image;
    image.loadFromData(data, "JPG");
    QPixmap pimage = QPixmap::fromImage(image);
    int w = image.width();
    int h = image.height();
    while (w > 1000 || h > 1000) {
        w /= 2;
        h /= 2;
    }
    qInfo() << w << h;
//    ui->image->setScaledContents(true);
    ui->image->setPixmap (pimage.scaled(w,h,Qt::KeepAspectRatio));
}

MainWindow::~MainWindow()
{
    delete ui;
}
