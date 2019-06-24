#include "mainwindow.h"
#include "ui_mainwindow.h"




EElementType elementTypeToEnum(std::string name)
{
    if ("div" == name) return  EElementType::Div;
    if ("input" == name) return  EElementType::Input;
    if ("button" == name) return  EElementType::Button;
    if ("p" == name ) return EElementType::p;
    if("span" == name ) return EElementType::span;
    if("h1" == name ) return EElementType::h1;



    return EElementType::Unknown;
}

void MainWindow::parseElement(QDomElement e, QObject* parent, EElementType parentType)
{
   // qDebug() << e.tagName();
    std::string name = e.tagName().toStdString();
    EElementType type = elementTypeToEnum(name);

    QObject* view = nullptr;

    QDomNamedNodeMap attributes = e.attributes();
    QString style = e.attribute("style", "");
    QString text = e.text();
//    qDebug() << text;
//    for (int i = 0; i < attributes.size(); ++i)
//    {
//        qDebug() << attributes.item(i).nodeValue();
//    }

    switch (type)
    {
        case EElementType::Div: {
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
                  //styleSheet
                div->setStyleSheet(style);
            }
            break;
        }
        case EElementType::Input: {
            if (parentType == EElementType::Div)
            {
                view = new QLineEdit();
                QWidget* widget = static_cast<QWidget*>(view);
                Div* p = static_cast<Div*>(parent);
                p->addWidget(widget);
                //styleSheet
                widget->setStyleSheet(style);
            }
            else
            {
                view = new QLineEdit(static_cast<QWidget*>(parent));
            }
            break;
        }
        case EElementType::Button: {
            if (parentType == EElementType::Div)
            {
                view = new QPushButton();
                QPushButton* widget = static_cast<QPushButton*>(view);
                static_cast<Div*>(parent)->addWidget(widget);
                //styleSheet
                widget->setStyleSheet(style);
                widget->setText(text);
            }
            else
            {
                view = new QPushButton(static_cast<QWidget*>(parent));
            }
            break;
        }
    case EElementType::p: {
            if (parentType == EElementType::Div)
            {
                view = new QLabel();
                QLabel* widget = static_cast<QLabel*>(view);
                static_cast<Div*>(parent)->addWidget(widget);
                //styleSheet
                widget->setStyleSheet(style);
                widget->setText(text);
            }
            else
            {
                view = new QLabel(static_cast<QWidget*>(parent));

            }
           break;
        }
        case EElementType::span: {
            if (parentType == EElementType::Div)
            {
                view = new QLabel();
                QLabel* widget = static_cast<QLabel*>(view);
                static_cast<Div*>(parent)->addWidget(widget);
                //styleSheet
                widget->setStyleSheet(style);
                widget->setText(text);
            }
            else
            {
                view = new QLabel(static_cast<QWidget*>(parent));
            }
           break;
        }
        case EElementType::h1: {
            if (parentType == EElementType::Div)
            {
                view = new QLabel();
                QLabel* widget = static_cast<QLabel*>(view);
                static_cast<Div*>(parent)->addWidget(widget);
                //styleSheet
                widget->setStyleSheet(style);
                widget->setStyleSheet("font-size: 36px");


                widget->setText(text);
            }
            else
            {
                view = new QLabel(static_cast<QWidget*>(parent));
            }
           break;
        }
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
