#ifndef SECONDMENU_H
#define SECONDMENU_H

#include <QDialog>

namespace Ui {
class SecondMenu;
}

class SecondMenu : public QDialog
{
    Q_OBJECT

public:
    explicit SecondMenu(QWidget *parent = nullptr);
    ~SecondMenu();

private:
    Ui::SecondMenu *ui;
};

#endif // SECONDMENU_H
