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
    Img
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
    ~MainWindow();

private slots:
    void onDownloadFinished1(void* usrPtr, QByteArray data);

private:
    Ui::MainWindow *ui;
    Div* mLayout = nullptr;
    DownloadManager* download;

};

#endif // MAINWINDOW_H
