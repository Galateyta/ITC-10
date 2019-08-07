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
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private:
    Ui::MainWindow *ui;

private slots:
    void numbersClick();
    void pushButtonPMClick();
    void matOperations();

    void on_pushButtonKet_clicked();
    void on_pushButtonEq_clicked();
    void on_pushButtonAC_clicked();
};

#endif // MAINWINDOW_H
