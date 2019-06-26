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
    void parseElement(QDomElement e, QObject* parente);
    QObject* createDiv(QObject* view, QDomElement e,QObject* parent, QString style, QBoxLayout::Direction direction, Qt::Alignment alignment);
    void createInput(QObject* view, QDomElement e,QObject* parent, QString inputType, QString text, QString style);
    void createButton(QObject* view, QDomElement e,QObject* parent, QString text, QString style);
    void createTextarea(QObject* view, QDomElement e,QObject* parent, QString text, QString style);
    void createSelect(QObject* view, QDomElement e,QObject* parent, QString style);
    void createTable(QObject* view, QDomElement e,QObject* parent, QString style);
    void createImg(QObject* view, QDomElement e,QObject* parent, QString style);
    void createText(QObject* view, QDomElement e,QObject* parent, QString text, QString style, std::string name);
    void createList(QObject* view, QDomElement e,QObject* parent, QString style, std::string name);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
    Div* mLayout = nullptr;
    DownloadManager* mDownloadManager;

private slots:
    void onDownloadFinished(void* usrPtr, QByteArray data);

};

#endif // MAINWINDOW_H
