#include "secondmenu.h"
#include "ui_secondmenu.h"

SecondMenu::SecondMenu(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::SecondMenu)
{
    ui->setupUi(this);
}

SecondMenu::~SecondMenu()
{
    delete ui;
}
