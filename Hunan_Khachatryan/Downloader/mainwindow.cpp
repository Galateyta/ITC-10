#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_pushButton_clicked()
{
    QNetworkAccessManager *nam = new QNetworkAccessManager(this);
        connect(nam, &QNetworkAccessManager::finished, this, &MainWindow::downloadFinished);


        QString link = ui->lineEdit->text();
        const QUrl url = QUrl(link);
        QNetworkRequest request(url);
        nam->get(request);
}

void MainWindow::downloadFinished(QNetworkReply *reply)
{
    QPixmap pm;
    pm.loadFromData(reply->readAll());
    ui->label->setPixmap(pm) ;
}
