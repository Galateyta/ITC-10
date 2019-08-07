#include "mainwindow.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    MainWindow w;
//    w.setMaximumSize(205,216);
//    w.setMinimumSize(205,216);

    w.show();

    return a.exec();
}
