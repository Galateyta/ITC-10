#ifndef INFO_H
#define INFO_H

#include <QDialog>

namespace Ui {
class Info;
}

class Info : public QDialog
{
    Q_OBJECT

public:
    explicit Info(QString name,
    QString lastname,
    int age,
    QString country,
    QString birthday,QWidget *parent = nullptr);
    ~Info();

private slots:
    void on_pushButton_clicked();

private:
    Ui::Info *ui;
    QString name;
    QString lastname;
    int age;
    QString country;
    QString birthday;
};

#endif // INFO_H
