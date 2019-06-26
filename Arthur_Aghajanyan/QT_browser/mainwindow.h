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
#include <QLabel>
#include "div.h"
#include <QTextEdit>
#include <QComboBox>
#include <QCheckBox>
#include <QRadioButton>
#include <QSize>
#include <QTableWidget>
#include <QListWidget>

enum class EElementType
{
    Unknown,
    Div,
    Input,
    Button,
    TextArea,
    Select,
    Table,
    Img,
    p,
    span,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    ol,
    ul
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

    void createH(QObject* view, QDomElement e, QObject* parent, EElementType parentType, EElementType type);
    void createPAndSpan(QObject* view, QDomElement e, QObject* parent, EElementType parentType);
    void createButton(QObject* view, QDomElement e, QObject* parent, EElementType parentType);
    void createInpute(QObject* view, QDomElement e, QObject* parent, EElementType parentType,QString typeOfTag);
    void createTextArea(QObject *view, QDomElement e, QObject *parent, EElementType parentType);
    void createSelect(QObject *view, QDomElement e, QObject *parent, EElementType parentType);
    void createTable(QObject *view, QDomElement e, QObject *parent, EElementType parentType);
    void createImg(QObject *view, QDomElement e, QObject *parent, EElementType parentType);
    void createOlAndUl(QObject *view, QDomElement e, QObject *parent, EElementType parentType);

    QString getHStyle(EElementType type);

private:
    Ui::MainWindow *ui;
    Div* mLayout = nullptr;
};

#endif // MAINWINDOW_H
