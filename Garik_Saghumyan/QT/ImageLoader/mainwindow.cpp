#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    ui->progressbar_button->setValue(0);
    QUrl imageUrl("http://assets.imgix.net/unsplash/bridge.jpg?auto=compress&w=600&h=600&fit=crop");
    m_pImgCtrl = new FileDownloader(imageUrl, this);

    connect(m_pImgCtrl, SIGNAL (downloaded()), this, SLOT (loadImage()));
    connect(m_pImgCtrl, SIGNAL(tick(int)), this, SLOT(onDownloadTick(int)));
}

MainWindow::~MainWindow()
{
    delete ui;
}
void MainWindow::onDownloadTick(int value)
{
    ui->progressbar_button->setValue(value);
}
void MainWindow::loadImage()
{
   QPixmap buttonImage;
   buttonImage.loadFromData(m_pImgCtrl->downloadedData());
   ui->image->setPixmap(buttonImage);
}
