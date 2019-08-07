#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QMessageBox>
#include <QDebug>
#include <cmath>

double firstNumber;
MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    ui->pushButton_div->setCheckable(true);
    ui->pushButton_mul->setCheckable(true);
    ui->pushButton_minus->setCheckable(true);
    ui->pushButton_plus->setCheckable(true);
    ui->pushButton_div_2->setCheckable(true);
    ui->pushButton_mul_2->setCheckable(true);
    ui->pushButton_minus_2->setCheckable(true);
    ui->pushButton_plus_2->setCheckable(true);
    ui->pushButton_sqrt->setCheckable(true);
    ui->pushButton_sqr->setCheckable(true);
    ui->pushButton_pow->setCheckable(true);


    connect(ui->pushButton_0,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_1,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_2,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_3,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_4,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_5,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_6,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_7,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_8,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_9,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_10,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_11,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_12,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_13,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_14,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_15,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_16,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_17,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_18,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_19,SIGNAL(clicked()),this,SLOT(numberPressed()));
    connect(ui->pushButton_minus,SIGNAL(clicked()),this,SLOT(operatorPressed()));
    connect(ui->pushButton_plus,SIGNAL(clicked()),this,SLOT(operatorPressed()));
    connect(ui->pushButton_mul,SIGNAL(clicked()),this,SLOT(operatorPressed()));
    connect(ui->pushButton_div,SIGNAL(clicked()),this,SLOT(operatorPressed()));
    connect(ui->pushButton_minus_2,SIGNAL(clicked()),this,SLOT(operatorPressed()));
    connect(ui->pushButton_plus_2,SIGNAL(clicked()),this,SLOT(operatorPressed()));
    connect(ui->pushButton_mul_2,SIGNAL(clicked()),this,SLOT(operatorPressed()));
    connect(ui->pushButton_div_2,SIGNAL(clicked()),this,SLOT(operatorPressed()));
    connect(ui->pushButton_point,SIGNAL(clicked()),this,SLOT(otherPressed()));
    connect(ui->pushButton_clear,SIGNAL(clicked()),this,SLOT(otherPressed()));
    connect(ui->pushButton_plusminus,SIGNAL(clicked()),this,SLOT(otherPressed()));
    connect(ui->pushButton_clear_all,SIGNAL(clicked()),this,SLOT(otherPressed()));
    connect(ui->pushButton_point_2,SIGNAL(clicked()),this,SLOT(otherPressed()));
    connect(ui->pushButton_clear_2,SIGNAL(clicked()),this,SLOT(otherPressed()));
    connect(ui->pushButton_plusminus_2,SIGNAL(clicked()),this,SLOT(otherPressed()));
    connect(ui->pushButton_clear_all_2,SIGNAL(clicked()),this,SLOT(otherPressed()));
    connect(ui->pushButton_sqr,SIGNAL(clicked()),this,SLOT(sqrPressed()));
    connect(ui->pushButton_sqrt,SIGNAL(clicked()),this,SLOT(sqrPressed()));
    connect(ui->pushButton_pow,SIGNAL(clicked()),this,SLOT(sqrPressed()));
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow :: numberPressed()
{
    QPushButton* button =(QPushButton*)sender();
    if(ui->page_2->isHidden() ){
        QString num= ui->lineEdit->text();
        if (!(num.length()==0 && button->text() == "0"))
        {
            ui->lineEdit->setText(num + button->text());
        }
    } else
     {
        QString num= ui->lineEdit_2->text();
        if (!(num.length()==0 && button->text() == "0"))\
         {
             ui->lineEdit_2->setText(num + button->text());
         }
     }
}

void MainWindow::otherPressed()
{
    QPushButton* button =(QPushButton*)sender();
    QString num;
    double lineNumber;
    if(ui->page_2->isHidden() )
    {
        lineNumber = ui->lineEdit->text().toDouble();
        if(button->text() == "C")
        {
            ui->lineEdit->setText("");
        } else if(button->text() == "+/-")
        {
            lineNumber = ui->lineEdit->text().toDouble();
            lineNumber *= -1;
            num = QString::number(lineNumber,'g',10);
            ui->lineEdit->setText(num);
        } else if (button->text() == "CE")
        {
             ui->lineEdit->setText("");
             firstNumber=0;
        } else
        {
            if(!(ui->lineEdit->text().contains(".")))
            {
                if(ui->lineEdit->text().length() == 0 )
                {
                     ui->lineEdit->setText("0.");
                } else
                {
                    ui->lineEdit->setText(ui->lineEdit->text()+".");
                }
            }

    }
    } else
    {
        lineNumber = ui->lineEdit_2->text().toDouble();

        if(button->text() == "C")
        {
            ui->lineEdit_2->setText("");
        } else if(button->text() == "+/-")
        {
            lineNumber = ui->lineEdit_2->text().toDouble();
            lineNumber *= -1;
            num = QString::number(lineNumber,'g',10);
            ui->lineEdit_2->setText(num);

        } else if (button->text() == "CE")
        {
            ui->lineEdit_2->setText("");
            firstNumber=0;

        } else
        {
            if(!(ui->lineEdit_2->text().contains(".")))
            {   if(ui->lineEdit_2->text().length() == 0 )
                {
                    ui->lineEdit_2->setText("0.");
                } else
                {
                  ui->lineEdit_2->setText(ui->lineEdit_2->text()+".");
                }
            }

        }

    }


}

void MainWindow:: operatorPressed()
{
    QPushButton* button =(QPushButton*)sender();
    if(ui->page_2->isHidden() )
    {
        firstNumber = ui->lineEdit->text().toDouble();
        ui->lineEdit->setText("");
    } else
    {
        firstNumber = ui->lineEdit_2->text().toDouble();
        ui->lineEdit_2->setText("");
    }
    button->setChecked(true);


}

void MainWindow::on_pushButton_equal_clicked()
{
     if (ui->pushButton_div->isChecked())
       {
       double  secondNumber = ui->lineEdit->text().toDouble();

       if (secondNumber == 0 )
       {
           QMessageBox::warning(this,"Error","Divide by zero!!!");
       } else
       {
           secondNumber= firstNumber / secondNumber;
           QString newNumber = QString :: number(secondNumber,'g',10);
           ui->lineEdit->setText(newNumber);
           ui->pushButton_div->setChecked(false);
        }
     }
    else if (ui->pushButton_mul->isChecked())
           {
        double  secondNumber = ui->lineEdit->text().toDouble();
        secondNumber= firstNumber * secondNumber;
        QString newNumber = QString :: number(secondNumber,'g',10);
        ui->lineEdit->setText(newNumber);
        ui->pushButton_mul->setChecked(false);
           }
    else if (ui->pushButton_plus->isChecked())
    {
        double  secondNumber = ui->lineEdit->text().toDouble();
        secondNumber= firstNumber + secondNumber;
        QString newNumber = QString :: number(secondNumber,'g',10);
        ui->lineEdit->setText(newNumber);
        ui->pushButton_plus->setChecked(false);
    }
    else
    {
        double  secondNumber = ui->lineEdit->text().toDouble();
        secondNumber= firstNumber - secondNumber;
        QString newNumber = QString :: number(secondNumber,'g',10);
        ui->lineEdit->setText(newNumber);
        ui->pushButton_minus->setChecked(false);

    }


}

void MainWindow::on_actionExit_triggered()
{
    hide();
}

void MainWindow::on_actionMode_triggered()
{
ui->stackedWidget->setCurrentIndex(0);
}

void MainWindow::on_actionAdvanced_Mode_triggered()
{
    ui->stackedWidget->setCurrentIndex(1);

}


void MainWindow::sqrPressed()
{
    QPushButton* button = (QPushButton*)sender();
    if (button->text() == "x^2" )
    {
        firstNumber = ui->lineEdit_2->text().toDouble();
        ui->lineEdit_2->setText(ui->lineEdit_2->text()+"^2");
        button->setChecked(true);

    } else if(button->text() == "x^n")
    {
        firstNumber = ui->lineEdit_2->text().toDouble();
        ui->lineEdit_2->setText(ui->lineEdit_2->text()+"^");
        button->setChecked(true);

    }else if(ui->lineEdit_2->text().length() == 0 )
    {
        button->setChecked(true);
    }



}

void MainWindow::on_pushButton_equal_2_clicked()
{
    if (ui->pushButton_div_2->isChecked())
      {
        double  secondNumber = ui->lineEdit_2->text().toDouble();
      if (secondNumber == 0 )
      {
          QMessageBox::warning(this,"Error","Divide by zero!!!");
      } else
      {
          secondNumber= firstNumber / secondNumber;
          QString newNumber = QString :: number(secondNumber,'g',10);
          ui->lineEdit_2->setText(newNumber);
          ui->pushButton_div_2->setChecked(false);
       }
    }
   else if (ui->pushButton_mul_2->isChecked())
          {
       double  secondNumber = ui->lineEdit_2->text().toDouble();
       secondNumber= firstNumber * secondNumber;
       QString newNumber = QString :: number(secondNumber,'g',10);
       ui->lineEdit_2->setText(newNumber);
       ui->pushButton_mul_2->setChecked(false);
          }
   else if (ui->pushButton_plus_2->isChecked())
   {
       double  secondNumber = ui->lineEdit_2->text().toDouble();
       secondNumber= firstNumber + secondNumber;
       QString newNumber = QString :: number(secondNumber,'g',10);
       ui->lineEdit_2->setText(newNumber);
       ui->pushButton_plus_2->setChecked(false);
   }
   else if(ui->pushButton_minus_2->isChecked())
   {
       double  secondNumber = ui->lineEdit_2->text().toDouble();
       secondNumber= firstNumber - secondNumber;
       QString newNumber = QString :: number(secondNumber,'g',10);
       ui->lineEdit_2->setText(newNumber);
       ui->pushButton_minus_2->setChecked(false);

   }
   else  if (ui->pushButton_sqr->isChecked())
              {
           double  secondNumber;
           secondNumber= firstNumber *firstNumber;
           QString newNumber = QString :: number(secondNumber,'g',10);
           ui->lineEdit_2->setText(newNumber);
           ui->pushButton_mul_2->setChecked(false);
              }
       else if (ui->pushButton_sqrt->isChecked())
       {
           double  secondNumber = ui->lineEdit_2->text().toDouble();
           secondNumber= firstNumber + secondNumber;
           QString newNumber = QString :: number(secondNumber,'g',10);
           ui->lineEdit_2->setText(newNumber);
           ui->pushButton_plus_2->setChecked(false);
       }
       else
       {
           double  secondNumber = ui->lineEdit_2->text().toDouble();
           secondNumber= firstNumber - secondNumber;
           QString newNumber = QString :: number(secondNumber,'g',10);
           ui->lineEdit_2->setText(newNumber);
           ui->pushButton_minus_2->setChecked(false);

       }
  }

