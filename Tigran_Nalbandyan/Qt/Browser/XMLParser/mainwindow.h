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
#include "div.h"
#include <QScrollArea>

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
    List
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

    QObject* createDiv(QObject *view, QDomElement e, QObject *parent, EElementType parentType);
    void createInput(QObject *view, QDomElement e, QObject *parent, EElementType parentType);
    void createButton(QObject *view, QDomElement e, QObject *parent, EElementType parentType);
    void createText(QObject *view, QDomElement e, QObject *parent, EElementType parentType);
    void createSelect(QObject *view, QDomElement e, QObject *parent, EElementType parentType);
    void createTable(QObject *view, QDomElement e, QObject *parent, EElementType parentType);
    void createImg(QObject *view, QDomElement e, QObject *parent, EElementType parentType);
    void createList(QObject *view, QDomElement e, QObject *parent, EElementType parentType);


    ~MainWindow();

private slots:
    void onDownloadFinished(void* usrPtr, QByteArray data);
    void onXmlPageDownloadFinished(void* usrPtr, QByteArray data);
    void onRefresh();
    void changePage(QString href);

private:
    Ui::MainWindow *ui;
    Div* mLayout = nullptr;
    DownloadManager* mDownloadManager;
    DownloadManager* mXmlDownloadManager;
    QLineEdit* mUrlInput = nullptr;
    QScrollArea* mBrowserArea = nullptr;
};

#endif // MAINWINDOW_H
