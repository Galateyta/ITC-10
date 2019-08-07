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

private:
    Ui::MainWindow *ui;
private slots:
    void digits_numbers();
    void on_pushButton_dot_clicked();
    void actions();
    void mathematical_actions();

    void on_pushButton_hav_clicked();
    void on_pushButton_ac_clicked();
};

#endif // MAINWINDOW_H
