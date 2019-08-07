#include "mainwindow.h"
#include "ui_mainwindow.h"

double num1;
MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    connect(ui->pushButton0,SIGNAL(clicked()),this,SLOT(numbersClick()));
    connect(ui->pushButton1,SIGNAL(clicked()),this,SLOT(numbersClick()));
    connect(ui->pushButton2,SIGNAL(clicked()),this,SLOT(numbersClick()));
    connect(ui->pushButton3,SIGNAL(clicked()),this,SLOT(numbersClick()));
    connect(ui->pushButton4,SIGNAL(clicked()),this,SLOT(numbersClick()));
    connect(ui->pushButton5,SIGNAL(clicked()),this,SLOT(numbersClick()));
    connect(ui->pushButton6,SIGNAL(clicked()),this,SLOT(numbersClick()));
    connect(ui->pushButton7,SIGNAL(clicked()),this,SLOT(numbersClick()));
    connect(ui->pushButton8,SIGNAL(clicked()),this,SLOT(numbersClick()));
    connect(ui->pushButton9,SIGNAL(clicked()),this,SLOT(numbersClick()));
    connect(ui->pushButtonPM,SIGNAL(clicked()),this,SLOT(pushButtonPMClick()));
    connect(ui->pushButtonProc,SIGNAL(clicked()),this,SLOT(pushButtonPMClick()));
    connect(ui->pushButtonPlus,SIGNAL(clicked()),this,SLOT(matOperations()));
    connect(ui->pushButtonMin,SIGNAL(clicked()),this,SLOT(matOperations()));
    connect(ui->pushButtonMult,SIGNAL(clicked()),this,SLOT(matOperations()));
    connect(ui->pushButtonDiv,SIGNAL(clicked()),this,SLOT(matOperations()));
    ui->pushButtonPlus->setCheckable(true);
    ui->pushButtonMin->setCheckable(true);
    ui->pushButtonMult->setCheckable(true);
    ui->pushButtonDiv->setCheckable(true);

}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::numbersClick()
{   double result;
    QString resultText;
    QPushButton* button = qobject_cast<QPushButton*>(sender());
    if (button)
    {
        if(ui->result->text().contains(".") && button->text() == "0")
        {
            resultText = ui->result->text() + button->text();
        } else
        {

            result = (ui->result->text() + button->text()).toDouble();
            resultText = QString::number(result,'g',12);
            ui->result->setText(resultText);
        }
    }
}
void MainWindow::on_pushButtonKet_clicked()
{
    if(!ui->result->text().contains('.'))
    {
        ui->result->setText(ui->result->text() + ".");
    }
}
void  MainWindow::pushButtonPMClick()
{
    double result;
    QString resultText;
    QPushButton* button = qobject_cast<QPushButton*>(sender());
    if(button->text() == "+/-")
    {
        result = (ui->result->text()).toDouble();
        result = result * -1;
        resultText = QString::number(result,'g',12);
        ui->result->setText(resultText);
    } else if(button->text() == "%")
    {
        result = (ui->result->text()).toDouble();
        result = result * 0.01;
        resultText = QString::number(result,'g',12);
        ui->result->setText(resultText);
    }
}

void  MainWindow::matOperations()
{
    QPushButton* button = qobject_cast<QPushButton*>(sender());
    num1 = ui->result->text().toDouble();
    ui->result->setText("");
    button->setChecked(true);
}

void MainWindow::on_pushButtonEq_clicked()
{
    double result =  ui->result->text().toDouble();
    QString resultText;
    if(ui->pushButtonPlus->isChecked())
    {
        result = num1 + result;
        resultText = QString::number(result,'g',12);
        ui->result->setText(resultText);
        ui->pushButtonPlus->setChecked(false);
    } else if(ui->pushButtonMin->isChecked())
    {
        result = num1 - result;
        resultText = QString::number(result,'g',12);
        ui->result->setText(resultText);
        ui->pushButtonMin->setChecked(false);
    } else if(ui->pushButtonMult->isChecked())
    {
        result = num1 * result;
        resultText = QString::number(result,'g',12);
        ui->result->setText(resultText);
        ui->pushButtonMult->setChecked(false);
    } else if(ui->pushButtonDiv->isChecked())
    {
        if(result == 0)
        {
             ui->result->setText("0");
        } else
        {
            result = num1 / result;
            resultText = QString::number(result,'g',12);
            ui->result->setText(resultText);
        }
        ui->pushButtonDiv->setChecked(false);
    }

}

void MainWindow::on_pushButtonAC_clicked()
{
    ui->result->setText("0");
    ui->pushButtonPlus->setChecked(false);
    ui->pushButtonMin->setChecked(false);
    ui->pushButtonMult->setChecked(false);
    ui->pushButtonDiv->setChecked(false);
}
