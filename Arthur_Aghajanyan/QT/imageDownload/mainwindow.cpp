#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QNetworkAccessManager>
#include <QNetworkRequest>
#include "filedownloader.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    QUrl imageUrl("http://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
    m_pImgCtrl = new FileDownloader(imageUrl, this);
    ui->progressBar->setValue(0);
    connect(ui->pushButton, SIGNAL (downloaded()), this, SLOT (on_pushButton_clicked()));
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::loadImage()
{
    QPixmap buttonImage;
    buttonImage.loadFromData(m_pImgCtrl->downloadedData());
    ui->label->setPixmap(buttonImage);

}

void MainWindow::on_pushButton_clicked()
{

    loadImage();
    ui->progressBar->setValue(55);
}

