#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QDebug>

double firstNumber = 0;
bool userIsTypingSecondNumber = false;

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    connect(ui->pushButton0, SIGNAL(released()), this, SLOT(digitPressed()));
    connect(ui->pushButton1, SIGNAL(released()), this, SLOT(digitPressed()));
    connect(ui->pushButton2, SIGNAL(released()), this, SLOT(digitPressed()));
    connect(ui->pushButton3, SIGNAL(released()), this, SLOT(digitPressed()));
    connect(ui->pushButton4, SIGNAL(released()), this, SLOT(digitPressed()));
    connect(ui->pushButton5, SIGNAL(released()), this, SLOT(digitPressed()));
    connect(ui->pushButton6, SIGNAL(released()), this, SLOT(digitPressed()));
    connect(ui->pushButton7, SIGNAL(released()), this, SLOT(digitPressed()));
    connect(ui->pushButton8, SIGNAL(released()), this, SLOT(digitPressed()));
    connect(ui->pushButton9, SIGNAL(released()), this, SLOT(digitPressed()));

    connect(ui->pushButtonPlusMinus, SIGNAL(released()), this, SLOT(unaryOperationPressed()));

     connect(ui->pushButtonPlus, SIGNAL(released()), this, SLOT(binaryOperationPressed()));
     connect(ui->pushButtonMinus, SIGNAL(released()), this, SLOT(binaryOperationPressed()));
     connect(ui->pushButtonProduct, SIGNAL(released()), this, SLOT(binaryOperationPressed()));
     connect(ui->pushButtonDevide, SIGNAL(released()), this, SLOT(binaryOperationPressed()));

     ui->pushButtonPlus->setCheckable(true);
     ui->pushButtonMinus->setCheckable(true);
     ui->pushButtonProduct->setCheckable(true);
     ui->pushButtonDevide->setCheckable(true);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::digitPressed()
{
    QPushButton* button = (QPushButton*)sender();
    double labelNumber = 0;
    QString newLabel = "";


    if ((ui->pushButtonPlus->isChecked() || ui->pushButtonMinus->isChecked()
        || ui->pushButtonProduct->isChecked() || ui->pushButtonDevide->isChecked()) && (!userIsTypingSecondNumber))
    {
        labelNumber = button->text().toDouble();
        userIsTypingSecondNumber = true;
        newLabel = QString::number(labelNumber, 'g', 15);
    } else {
        if (ui->label->text().contains('.') && button->text() == '0') {
            newLabel = ui->label->text() + button->text();
        } else {
            labelNumber = (ui->label->text() + button->text()).toDouble();
            newLabel = QString::number(labelNumber, 'g', 15);
        }
    }

    ui->label->setText(newLabel);
}

void MainWindow::on_pushButtonPoint_released()
{
    ui->label->setText(ui->label->text() + ".");
}

void MainWindow::unaryOperationPressed()
{
    QPushButton* button = (QPushButton*) sender();
    double labelNumber;
    QString newLabel;

    if (button->text() == "+/-")
    {
        labelNumber = ui->label->text().toDouble();
        labelNumber = labelNumber * -1;
        newLabel = QString::number(labelNumber, 'g', 15);
        ui->label->setText(newLabel);
    }
}

void MainWindow::on_pushButtonClear_released()
{
    ui->pushButtonPlus->setChecked(false);
    ui->pushButtonMinus->setChecked(false);
    ui->pushButtonProduct->setChecked(false);
    ui->pushButtonDevide->setChecked(false);

    userIsTypingSecondNumber = false;
    ui->label->setText("0");
}

void MainWindow::on_pushButtonEqual_released()
{
    double labelNumber = 0;
    QString newLabel = "";
    double secondNumber = ui->label->text().toDouble();

    if (ui->pushButtonPlus->isChecked())
    {
        labelNumber = firstNumber + secondNumber;
        newLabel = QString::number(labelNumber, 'g', 15);
        ui->label->setText(newLabel);
        ui->pushButtonPlus->setChecked(false);
    }
    else if (ui->pushButtonMinus->isChecked())
    {
        labelNumber = firstNumber - secondNumber;
        newLabel = QString::number(labelNumber, 'g', 15);
        ui->label->setText(newLabel);
        ui->pushButtonMinus->setChecked(false);
    }
    else if (ui->pushButtonProduct->isChecked())
    {
        labelNumber = firstNumber * secondNumber;
        newLabel = QString::number(labelNumber, 'g', 15);
        ui->label->setText(newLabel);
        ui->pushButtonProduct->setChecked(false);
    }
    else if (ui->pushButtonDevide->isChecked())
    {
        labelNumber = firstNumber / secondNumber;
        newLabel = QString::number(labelNumber, 'g', 15);
        ui->label->setText(newLabel);
        ui->pushButtonDevide->setChecked(false);
    }
}

void MainWindow::binaryOperationPressed()
{
    QPushButton* button = (QPushButton*) sender();
    firstNumber = ui->label->text().toDouble();
    button->setChecked(true);
}
