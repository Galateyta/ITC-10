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
#include <QLabel>
#include "downloadmanager.h"
#include <QScrollArea>
enum class EElementType
{
    Unknown,
    Div,
    Input,
    Textarea,
    Button,
    Text,
    Select,
    List,
    Table,
    Img,
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
    void setPixelsToHeaders(QLabel* label, QFont font, int pixels);
    QObject* addDivElement(QObject* view, QObject* parent, EElementType parentType, QString style, QBoxLayout::Direction direction, Qt::Alignment alignment );
    void addInputElements(QObject* view, QObject* parent, EElementType parentType, QString style, QString inputType, QString value);
    void addTextAreaElements(QObject* view, QObject* parent, EElementType parentType, QString style, QString value);
    void addSelectElements(QObject* view, QObject* parent, EElementType parentType, QDomElement e, QString style);
    void addListElements(QObject* view, QObject* parent, EElementType parentType, QDomElement e, QString style);
    void addTableElements(QObject* view, QObject* parent, EElementType parentType, QDomElement e, QString style);
    void addButtonElements(QObject* view, QObject* parent, EElementType parentType, QString style, QString value);
    void addImageElemets(QObject* view, QObject* parent, EElementType parentType,QDomElement e, QString style, QString src);
    void addTextElements(QObject* view, QObject* parent, EElementType parentType, QString style, QString value, EElementType headerName);

    ~MainWindow();


private slots:
    void onDownloadFinished(void* usrPtr, QByteArray data);
    void onXmlPageDownloadFinished(void* usrPtr, QByteArray data);
    void onImageDownloadFinished(void *usrPtr, QByteArray data);
    void onRefresh();

private:
    Ui::MainWindow *ui;
    Div* mLayout = nullptr;
    DownloadManager* download;
    DownloadManager* mXmlPageDownloadManager;
    DownloadManager *imageDownloader;
    QLineEdit* mUrlInput = nullptr;
    QScrollArea* mBrowserArea = nullptr;
};

#endif // MAINWINDOW_H
