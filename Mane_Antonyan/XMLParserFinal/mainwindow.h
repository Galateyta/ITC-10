#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include "downloadmanager.h"
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
#include <QCheckBox>
#include <QRadioButton>
#include <QTextEdit>
#include <QComboBox>
#include <QNetworkReply>
#include "div.h"
#include <QScrollArea>

enum class EElementType
{
    Unknown,
    Div,
    Input,
    Button,
    TextArea,
    Select,
    Table,
    Span,
    Img,
    Ul,
    Ol,
    P,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6

};

namespace Ui
{
    class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    QString getStyle(EElementType);
    void parseElement(QDomElement e, QObject* parent, EElementType parentType);
    void createSelect(QDomElement, QObject*, QString, QObject*, EElementType);
    void createTable(QObject*, QString, EElementType, QObject*, QDomElement);
    void createImg(EElementType, QObject*, QObject*, QString, QDomElement);
    void createInput(QString, EElementType, QObject*, QString, QObject*, QString, QString);
    void createButton(EElementType, QObject*, QObject*, QString, QString);
    void createText(QObject*, QDomElement, QObject*,EElementType, EElementType);
    void createTextArea(QObject*, EElementType, QObject*, QString, QString);
    QObject* createDiv(EElementType, QObject*, QObject*,
            QString, QBoxLayout::Direction, Qt::Alignment);
    void createInputText(EElementType, QObject*, QString, QObject*, QString);
    void createInputCheckbox(EElementType, QObject*, QString, QObject*);
    void createInputRadio(EElementType, QObject*, QString, QObject*);
    void createList(QObject*, QDomElement, QObject*,EElementType);
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
