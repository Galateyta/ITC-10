#ifndef MAINWINDOW_H
#define MAINWINDOW_H

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
    int on_action_button_clicked(QString buttonType);

private:
    Ui::MainWindow *ui;
    QString display = "0";
    QString action;
    int a;
    int b;
};

#endif // MAINWINDOW_H
