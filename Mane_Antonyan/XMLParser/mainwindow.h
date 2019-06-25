#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QVBoxLayout>
#include <QtXml/QDomDocument>
#include <QFile>
#include <QDebug>
#include <QWidget>
#include <QVBoxLayout>
#include <QLineEdit>
#include <QPushButton>
#include "div.h"

enum class EElementType
{
    Unknown,
    Div,
    Input,
    Button,
    P,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    Span
};

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    void parseElement(QDomElement, QObject*, EElementType);
    void create(QObject*, QDomElement, QObject*, EElementType, EElementType);
    QString getStyle(EElementType);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
    Div* mLayout = nullptr;
};

#endif // MAINWINDOW_H
