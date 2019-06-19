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
    explicit Info(QWidget *parent = nullptr);
    ~Info();
    void updateText(QString name, QString lastname, QString age, QString country, QString birthday);

private slots:
    void on_pushButton_clicked();

private:
    Ui::Info *ui;
};

#endif // INFO_H
