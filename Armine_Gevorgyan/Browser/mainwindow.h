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
#include <QScrollArea>
#include <QFile>

enum class EElementType
{
    TextArea,
    Unknown,
    Select,
    Button,
    Table,
    Input,
    Span,
    List,
    Img,
    Div,
    P,
    H,
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
    void createSpan(QDomElement e, QObject* view, QObject* parent, EElementType parentType);
    void createList(QDomElement e, QObject* view, QObject* parent, EElementType parentType);
    void createInput(QDomElement e, QObject* view, QObject* parent, EElementType parentType);
    void createImage(QDomElement e, QObject* view, QObject* parent, EElementType parentType);
    void createTable(QDomElement e, QObject* view, QObject* parent, EElementType parentType);
    void createHeader(QDomElement e, QObject* view, QObject* parent, EElementType parentType);
    void createSelect(QDomElement e, QObject* view, QObject* parent, EElementType parentType);
    void createButton(QDomElement e, QObject* view, QObject* parent, EElementType parentType);
    QObject* createDiv(QDomElement e, QObject* view, QObject* parent, EElementType parentType);
    void createTextArea(QDomElement e, QObject* view, QObject* parent, EElementType parentType);
    void createParagraph(QDomElement e, QObject* view, QObject* parent, EElementType parentType);


    ~MainWindow();

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
