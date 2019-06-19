#include "info.h"
#include "ui_info.h"

Info::Info(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Info)
{
    ui->setupUi(this);
}

Info::~Info()
{
    delete ui;
}

void Info::on_pushButton_clicked()
{
    close();
}

void Info::updateText(QString name, QString lastname, QString age, QString country, QString birthday) {
    ui->name->setText(name);
    ui->lastname->setText(lastname);
    ui->age->setText(age);
    ui->country->setText(country);
    ui->birthday->setText(birthday);
}
