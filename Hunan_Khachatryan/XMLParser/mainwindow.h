#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include "downloadmanager.h"
#include "div.h"
#include <QtXml/QDomDocument>
#include <QNetworkReply>
#include <QRadioButton>
#include <QMainWindow>
#include <QVBoxLayout>
#include <QPushButton>
#include <QComboBox>
#include <QTextEdit>
#include <QLineEdit>
#include <QCheckBox>
#include <QWidget>
#include <QDebug>
#include <QLabel>
#include <QFile>

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
    Span,
    P,
    Ul,
    Ol,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6

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
    QObject* createDiv(QObject *view, QDomElement e, QObject *parent,EElementType type);
    void createButton(QObject* view, QDomElement e, QObject* parent);
    void createInput(QObject* view, QDomElement e, QObject* parent);
    void createSelect(QObject* view, QDomElement e, QObject* parent);
    void createImage(QObject* view, QDomElement e, QObject* parent);
    void createP(QObject* view, QDomElement e, QObject* parent);
    void createSpan(QObject *view, QDomElement e, QObject *parent);
    void createTable(QObject *view, QDomElement e, QObject *parent);
    void createH(QObject *view, QDomElement e, QObject *parent,EElementType type);
    void addText(QObject *view, QDomElement e, QObject *parent,QString style);
    void createTextArea(QObject *view, QDomElement e, QObject *parent);
    void createOlAndUl(QObject* view, QDomElement e, QObject* parent);



    ~MainWindow();

private slots:
    void onDownloadFinished(void* usrPtr, QByteArray data);

private:
    Ui::MainWindow *ui;
    Div* mLayout = nullptr;
    DownloadManager* mDownloadManager;
};

#endif // MAINWINDOW_H
