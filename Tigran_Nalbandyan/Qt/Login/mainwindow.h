#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include "info.h"
#include <QMainWindow>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:


    void on_buttonBox_accepted();

    void on_buttonBox_rejected();

private:
    Ui::MainWindow *ui;
    Info* info;
};

#endif // MAINWINDOW_H
