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
#include <QComboBox>
#include <QTableWidget>
#include <QTextEdit>
#include <QCheckBox>
#include <QRadioButton>
#include <QListWidget>
#include <QScrollArea>
#include <QNetworkReply>
#include "div.h"

enum class EElementType
{
    Unknown,
    Div,
    Input,
    Button,
    Textarea,
    Select,
    Table,
    Img,
    Text,
    List
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
    void parseElement(QDomElement e, QObject* parent, EElementType parentType);
    QObject* createDiv(QObject* view, EElementType parentType, QObject* parent, QString style, QBoxLayout::Direction direction, Qt::Alignment alignment);
    void createInput(QObject* view, EElementType parentType, QObject* parent, QString inputType, QString text, QString style);
    void createButton(QObject* view, EElementType parentType, QObject* parent, QString text, QString style);
    void createTextarea(QObject* view, EElementType parentType, QObject* parent, QString text, QString style);
    void createSelect(QObject* view, EElementType parentType, QDomElement e,QObject* parent, QString style);
    void createTable(QObject* view, EElementType parentType, QDomElement e,QObject* parent, QString style);
    void createImg(QObject* view, EElementType parentType, QDomElement e,QObject* parent, QString style);
    void createText(QObject* view, EElementType parentType, QObject* parent, QString text, QString style, std::string name);
    void createList(QObject* view, EElementType parentType, QDomElement e,QObject* parent, QString style, std::string name);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
    Div* mLayout = nullptr;
    DownloadManager* mDownloadManager;
    DownloadManager* mXmlPageDownloadManager;
    QLineEdit* mUrlInput = nullptr;
    QScrollArea* mBrowserArea = nullptr;

private slots:
    void onDownloadFinished(void* usrPtr, QByteArray data);
    void onXmlPageDownloadFinished(void* usrPtr, QByteArray data);
    void onRefresh();
};

#endif // MAINWINDOW_H
