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
#include <QLabel>
#include <QPushButton>
#include <QComboBox>
#include <QTableWidget>
#include <QTextEdit>
#include <QCheckBox>
#include <QRadioButton>
#include <QScrollArea>

#include "div.h"

enum class EElementType
{
    Unknown,
    Div,
    Input,
    Button,
    Text,
    Select,
    Table,
    Img,
    Textarea
};

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    void parseElement(QDomElement e, QObject* parent, EElementType parentType);

    ~MainWindow();

private:
    Ui::MainWindow *ui;
    Div* mLayout = nullptr;
};

#endif // MAINWINDOW_H
