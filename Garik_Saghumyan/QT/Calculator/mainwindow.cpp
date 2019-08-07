#include "mainwindow.h"
#include "ui_mainwindow.h"

double result;
MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    connect(ui->mButtonPlus, SIGNAL(clicked()),this, SLOT(onPlusButtonClicked()));
    connect(ui->mButtonMinus, SIGNAL(clicked()),this, SLOT(onMinusButtonClicked()));
    connect(ui->mButtonMultiply, SIGNAL(clicked()),this, SLOT(onMultplyButtonClicked()));
    connect(ui->mButtonDevide, SIGNAL(clicked()),this, SLOT(onDevideButtonClicked()));
    connect(ui->mButtonClear, SIGNAL(clicked()),this, SLOT(onClearButtonClicked()));
    connect(ui->mButtonEqual, SIGNAL(clicked()),this, SLOT(onEqualButtonClicked()));

}

MainWindow::~MainWindow()
{
    delete ui;
}
void MainWindow::onPlusButtonClicked()
{
    double a, b;
    a = ui->inputA->text().toDouble();
    b = ui->inputB->text().toDouble();
    result = a + b;

}
void MainWindow::onMinusButtonClicked()
{
    double a, b;
    a = ui->inputA->text().toDouble();
    b = ui->inputB->text().toDouble();
    result = a - b;
}
void MainWindow::onMultplyButtonClicked()
{
    double a, b;
    a = ui->inputA->text().toDouble();
    b = ui->inputB->text().toDouble();
    result = a * b;
}
void MainWindow::onDevideButtonClicked()
{
    double a, b;
    a = ui->inputA->text().toDouble();
    b = ui->inputB->text().toDouble();
    result = a / b;
}
void MainWindow::onClearButtonClicked()
{
    ui->inputA->setText(QString::number(0));
    ui->inputB->setText(QString::number(0));
    ui->inputResult->setText(QString::number(0));
}
void MainWindow::onEqualButtonClicked()
{
    ui->inputResult->setText(QString::number(result));
}
