#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "info.h"

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

void MainWindow::on_buttonBox_accepted()
{
    QString name = ui->name->text();
    QString lastname = ui->lastname->text();
    int age = ui->age->value();
    QString country = ui->country->currentText();
    QString birthday = ui->birthday->text();

    info = new Info(name, lastname, age, country, birthday);
    info->show();
}

void MainWindow::on_buttonBox_rejected()
{
    close();
}
