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
private slots:
    void digitPressed();
    void on_pushButtonPoint_released();
    void unaryOperationPressed();
    void binaryOperationPressed();
    void on_pushButtonClear_released();

    void on_pushButtonEqual_released();

private:
    Ui::MainWindow *ui;
};

#endif // MAINWINDOW_H
