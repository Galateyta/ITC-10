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
#include <QTableWidget>
#include <QScrollArea>
#include <QListWidget>
#include <QComboBox>
#include <QTextEdit>
#include <QLineEdit>
#include <QCheckBox>
#include <QWidget>
#include <QDebug>
#include <QLabel>
#include <QFile>
#include <QSize>


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
    void createButton(QObject* view, QDomElement e, QObject* parent,EElementType parentType);
    void createInput(QObject* view, QDomElement e, QObject* parent,EElementType parentType);
    void createSelect(QObject* view, QDomElement e, QObject* parent,EElementType parentType);
    void createImage(QObject* view, QDomElement e, QObject* parent,EElementType parentType);
    void createP(QObject* view, QDomElement e, QObject* parent,EElementType parentType);
    void createTable(QObject *view, QDomElement e, QObject *parent,EElementType parentType);
    void createH(QObject *view, QDomElement e, QObject *parent,EElementType type,EElementType parentType);
    void addText(QObject *view, QDomElement e, QObject *parent,QString style,EElementType parentType);
    void createTextArea(QObject *view, QDomElement e, QObject *parent,EElementType parentType);
    void createList(QObject* view, QDomElement e, QObject* parent,EElementType parentType);
    void onClick(QString url, QPushButton* usrPtr);



    ~MainWindow();

signals:
   void clickButton(QString);

private slots:
    void onDownloadFinished(void* usrPtr, QByteArray data);
    void onXmlPageDownloadFinished(void* usrPtr, QByteArray data);
    void onRefresh();

private:
    Ui::MainWindow *ui;
    Div* mLayout = nullptr;
    DownloadManager* mDownloadManager;
    DownloadManager* mXmlPageDownloadManager;
    QLineEdit* mUrlInput = nullptr;
    QScrollArea* mBrowserArea = nullptr;
};

#endif // MAINWINDOW_H
