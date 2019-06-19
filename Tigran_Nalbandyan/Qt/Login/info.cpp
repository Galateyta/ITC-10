#include "info.h"
#include "ui_info.h"

Info::Info(QString name,
           QString lastname,
           int age,
           QString country,
           QString birthday,QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Info)
{
    ui->setupUi(this);
    this->name = name;
    this->lastname = lastname;
    this->age = age;
    this->country = country;
    this->birthday = birthday;
    ui->name->setText(name);
    ui->lastname->setText(lastname);
    ui->age->setText(QString::number(age));
    ui->country->setText(country);
    ui->birthday->setText(birthday);
}

Info::~Info()
{
    delete ui;
}

void Info::on_pushButton_clicked()
{
    close();
}
