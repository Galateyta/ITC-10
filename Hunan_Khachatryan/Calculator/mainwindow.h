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
    void numberPressed();

    void operatorPressed();

    void otherPressed();

    void sqrPressed();
    void on_pushButton_equal_clicked();

    void on_actionExit_triggered();

    void on_actionMode_triggered();

    void on_actionAdvanced_Mode_triggered();

    void on_pushButton_equal_2_clicked();


private:
    Ui::MainWindow *ui;
};

#endif // MAINWINDOW_H
