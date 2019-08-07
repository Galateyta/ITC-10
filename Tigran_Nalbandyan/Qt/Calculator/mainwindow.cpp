#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    ui->display->setText(display);

    QPushButton* buttons[5] = {ui->plusButton, ui->minusButton, ui->multiplyButton, ui->divideButton, ui->equalButton};

    for (auto button : buttons ) {
        connect(button, &QPushButton::clicked, this, [this, button]{ on_action_button_clicked(button->text()); });
    }
}

MainWindow::~MainWindow()
{
    delete ui;
}

int MainWindow::on_action_button_clicked(QString buttonType)
{
    if (buttonType == "=") {
        if (a == NULL || ui->display->text() == "") {
            return 1;
        }
        int result;
        b = ui->display->text().toInt();
        if (action == "+") {
            result = a + b;
        } else if (action == "-") {
            result = a - b;
        } else if (action == "*") {
            result = a * b;
        } else if (action == "/") {
            result = a / b;
        } else {
            result = 0;
        }
        ui->display->setText(QString::number(result));
        a = NULL;
        b = NULL;
    } else {
        action = buttonType;
        a = ui->display->text().toInt();
        ui->display->clear();
    }
    return 0;
}
