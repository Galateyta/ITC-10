#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QScrollArea>




EElementType elementTypeToEnum(std::string name)
{
    if ("div" == name) return  EElementType::Div;
    if ("input" == name) return  EElementType::Input;
    if ("button" == name) return  EElementType::Button;
    if ("p" == name ) return EElementType::p;
    if ("span" == name ) return EElementType::span;
    if ("h1" == name ) return EElementType::h1;
    if ("h2" == name ) return EElementType::h2;
    if ("h3" == name ) return EElementType::h3;
    if ("h4" == name ) return EElementType::h4;
    if ("h5" == name ) return EElementType::h5;
    if ("h6" == name ) return EElementType::h6;

    return EElementType::Unknown;
}

void MainWindow::parseElement(QDomElement e, QObject* parent, EElementType parentType)
{
   // qDebug() << e.tagName();
    std::string name = e.tagName().toStdString();
    EElementType type = elementTypeToEnum(name);

    QObject* view = nullptr;
    QString style = e.attribute("style", "");
    QString text = e.text();

//    QDomNamedNodeMap attributes = e.attributes();
//    qDebug() << text;
//    for (int i = 0; i < attributes.size(); ++i)
//    {
//        qDebug() << attributes.item(i).nodeValue();
//    }

    switch (type)
    {
        case EElementType::Div:
            if (parentType == EElementType::Div)
            {
                view = new Div();
                Div* layout = static_cast<Div*>(view);
                static_cast<Div*>(parent)->addDiv(layout);
            }
            else
            {
                view = new Div(static_cast<QWidget*>(parent));
                Div* div = static_cast<Div*>(view);
                div->setStyleSheet(style);
            }
            break;
        case EElementType::Input:
            createInpute(view,e,parent,parentType);
            break;

        case EElementType::Button:
            createButton(view,e,parent,parentType);
           break;

        case EElementType::p:
           createPAndSpan(view,e,parent,parentType);
           break;

        case EElementType::span:
            createPAndSpan(view,e,parent,parentType);
           break;

        case EElementType::h1:
            createH(view, e, parent, parentType, type);
            break;

        case EElementType::h2:
            createH(view, e, parent, parentType, type);
            break;

        case EElementType::h3:
            createH(view, e, parent, parentType, type);
            break;

        case EElementType::h4:
            createH(view, e, parent, parentType, type);
            break;

        case EElementType::h5:
            createH(view, e, parent, parentType, type);
            break;

        case EElementType::h6:
            createH(view, e, parent, parentType, type);
            break;

    }

    if (!mLayout)
    {
        mLayout = static_cast<Div*>(view);
    }

    QDomNodeList childs = e.childNodes();
    for (int i = 0; i < childs.length(); ++i)
    {
        parseElement(childs.at(i).toElement(), view, type);
    }
}
void MainWindow::createInpute(QObject* view, QDomElement e, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    QString text = e.text();

    if (parentType == EElementType::Div)
    {
        view = new QLineEdit();
        QWidget* widget = static_cast<QWidget*>(view);
        Div* p = static_cast<Div*>(parent);
        p->addWidget(widget);
        widget->setStyleSheet(style);
    }
    else
    {
        view = new QLineEdit(static_cast<QWidget*>(parent));
    }
}
void MainWindow::createButton(QObject* view, QDomElement e, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    QString text = e.text();

    if (parentType == EElementType::Div)
    {
        view = new QPushButton();
        QPushButton* widget = static_cast<QPushButton*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
        widget->setStyleSheet(style);
        widget->setText(text);
    }
    else
    {
        view = new QPushButton(static_cast<QWidget*>(parent));
    }
}
void MainWindow::createH(QObject* view, QDomElement e, QObject* parent, EElementType parentType, EElementType type)
{
    QString style = e.attribute("style", "");
    QString text = e.text();

    if (parentType == EElementType::Div)
    {
        view = new QLabel();
        QLabel* widget = static_cast<QLabel*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
        widget->setText(text);
        widget->setStyleSheet(getHStyle(type) + ";" + style);
    }
    else
    {
        view = new QLabel(static_cast<QWidget*>(parent));
    }
}
void MainWindow::createPAndSpan(QObject* view, QDomElement e, QObject* parent, EElementType parentType){
    QString style = e.attribute("style", "");
    QString text = e.text();
    if (parentType == EElementType::Div)
    {
        view = new QLabel();
        QLabel* widget = static_cast<QLabel*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
        widget->setStyleSheet(style);
        widget->setText(text);
    }
    else
    {
        view = new QLabel(static_cast<QWidget*>(parent));
    }

}
QString MainWindow::getHStyle(EElementType type) {
    switch (type) {
        case EElementType::h1:
            return "font-size: 48px";
        case EElementType::h2:
            return "font-size: 36px";
        case EElementType::h3:
            return "font-size: 24px";
        case EElementType::h4:
            return "font-size: 18px";
        case EElementType::h5:
            return "font-size: 12px";
        case EElementType::h6:
            return "font-size: 9px";
        case EElementType::p:
            return "font-size: 50px";
    }
}

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    QFile xmlFile("/path/test.xml");
    xmlFile.open(QIODevice::ReadOnly | QIODevice::Text);
    QDomDocument d;
    d.setContent(xmlFile.readAll());

    QDomElement root = d.firstChildElement();
    parseElement(root, nullptr, EElementType::Unknown);
    QVBoxLayout * l = new QVBoxLayout();
    l->addWidget(mLayout);
    centralWidget()->setLayout(l);

}

MainWindow::~MainWindow()
{
    delete ui;
}
