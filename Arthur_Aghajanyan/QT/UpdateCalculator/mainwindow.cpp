#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QMessageBox>

double first_num;

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    connect(ui->pushButton_0,SIGNAL(clicked()),this,SLOT(digits_numbers()));
    connect(ui->pushButton_1,SIGNAL(clicked()),this,SLOT(digits_numbers()));
    connect(ui->pushButton_2,SIGNAL(clicked()),this,SLOT(digits_numbers()));
    connect(ui->pushButton_3,SIGNAL(clicked()),this,SLOT(digits_numbers()));
    connect(ui->pushButton_4,SIGNAL(clicked()),this,SLOT(digits_numbers()));
    connect(ui->pushButton_5,SIGNAL(clicked()),this,SLOT(digits_numbers()));
    connect(ui->pushButton_6,SIGNAL(clicked()),this,SLOT(digits_numbers()));
    connect(ui->pushButton_7,SIGNAL(clicked()),this,SLOT(digits_numbers()));
    connect(ui->pushButton_8,SIGNAL(clicked()),this,SLOT(digits_numbers()));
    connect(ui->pushButton_9,SIGNAL(clicked()),this,SLOT(digits_numbers()));
    connect(ui->pushButton_plmin,SIGNAL(clicked()),this,SLOT(actions()));
    connect(ui->pushButton_percent,SIGNAL(clicked()),this,SLOT(actions()));
    connect(ui->pushButton_min,SIGNAL(clicked()),this,SLOT(mathematical_actions()));
    connect(ui->pushButton_pl,SIGNAL(clicked()),this,SLOT(mathematical_actions()));
    connect(ui->pushButton_baz,SIGNAL(clicked()),this,SLOT(mathematical_actions()));
    connect(ui->pushButton_baj,SIGNAL(clicked()),this,SLOT(mathematical_actions()));

    ui->pushButton_min->setCheckable(true);
    ui->pushButton_pl->setCheckable(true);
    ui->pushButton_baz->setCheckable(true);
    ui->pushButton_baj->setCheckable(true);


}

MainWindow::~MainWindow()
{
    delete ui;
}
void MainWindow::digits_numbers()
{
    QPushButton * button = (QPushButton *)sender();
    double all_numbers;
    QString new_summa;
    if(ui->summa->text().contains(".") && button->text() == "0")
    {
        new_summa = ui->summa->text() + button->text();
    }
    else
    {
        all_numbers = (ui->summa->text() + button->text()).toDouble();
        new_summa = QString::number(all_numbers,'g',15);

    }
    ui->summa->setText(new_summa);

}
void MainWindow::actions()
{
    QPushButton * button = (QPushButton *)sender();
    double all_numbers;
    QString new_summa;

    if(button->text() == "+/-")
    {
        all_numbers = (ui->summa->text().toDouble());
        all_numbers = all_numbers * -1;
        new_summa = QString::number(all_numbers,'g',15);
        ui->summa->setText(new_summa);
    }else if(button->text() == "%")
    {
        all_numbers = (ui->summa->text().toDouble());
        all_numbers = all_numbers * 0.01;
        new_summa = QString::number(all_numbers,'g',15);
        ui->summa->setText(new_summa);
    }

}
void MainWindow::on_pushButton_dot_clicked()
{
    if(!(ui->summa->text().contains(".")))
    {
        ui->summa->setText(ui->summa->text() + ".");
    }

}
void MainWindow::mathematical_actions()
{
    QPushButton * button = (QPushButton *)sender();
    first_num = ui->summa->text().toDouble();
    ui->summa->setText("");
    button->setChecked(true);
}



void MainWindow::on_pushButton_hav_clicked()
{
    double label_num, second_num;
    QString new_summa;
    second_num = ui->summa->text().toDouble();

    if(ui->pushButton_pl->isChecked())
    {
        label_num = first_num + second_num;
        new_summa = QString::number(label_num,'g',15);
        ui->summa->setText(new_summa);
        ui->pushButton_pl->setChecked(false);
    }
    else if (ui->pushButton_min->isChecked())
    {
        label_num = first_num - second_num;
        new_summa = QString::number(label_num,'g',15);
        ui->summa->setText(new_summa);
        ui->pushButton_min->setChecked(false);
    }
    else if (ui->pushButton_baj->isChecked())
    {
        if(second_num != 0)
        {
            label_num = first_num / second_num;
            new_summa = QString::number(label_num,'g',15);
            ui->summa->setText(new_summa);
        }
        else
        {
            QMessageBox::critical(this,"Wrong actions","Division by zero");
            ui->summa->setText("0");
        }
        ui->pushButton_baj->setChecked(false);

    }
    else if (ui->pushButton_baz->isChecked())
    {
        label_num = first_num * second_num;
        new_summa = QString::number(label_num,'g',15);
        ui->summa->setText(new_summa);
        ui->pushButton_baz->setChecked(false);
    }
}

void MainWindow::on_pushButton_ac_clicked()
{
    ui->pushButton_pl->setChecked(false);
    ui->pushButton_min->setChecked(false);
    ui->pushButton_baj->setChecked(false);
    ui->pushButton_baz->setChecked(false);

    ui->summa->setText("0");
}
