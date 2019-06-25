#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QTextBlock>
#include <QLabel>
#include <QString>

EElementType elementTypeToEnum(std::string name)
{
    if ("div" == name) return  EElementType::Div;
    if ("input" == name) return  EElementType::Input;
    if ("button" == name) return  EElementType::Button;
    if ("p" == name ) return EElementType::P;
    if ("span" == name ) return EElementType::Span;
    if ("h1" == name ) return EElementType::H1;
    if ("h2" == name ) return EElementType::H2;
    if ("h3" == name ) return EElementType::H3;
    if ("h4" == name ) return EElementType::H4;
    if ("h5" == name ) return EElementType::H5;
    if ("h6" == name ) return EElementType::H6;

    return EElementType::Unknown;
}

void MainWindow::parseElement(QDomElement e, QObject* parent, EElementType parentType)
{
    std::string name = e.tagName().toStdString();
    EElementType type = elementTypeToEnum(name);

    QObject* view = nullptr;

    QDomNamedNodeMap attributes = e.attributes();
    QString style = e.attribute("style", "");
    for (int i = 0; i < attributes.size(); ++i)
    {
        qDebug() << attributes.item(i).nodeValue();

    }

    switch (type)
    {
    case EElementType::Div: {
        if (parentType == EElementType::Div)
        {
             view = new Div();
             Div* layout = static_cast<Div*>(view);
             static_cast<Div*>(parent)->addDiv(layout);
             layout->setStyleSheet(style);
        }
        else
        {
              view = new Div(static_cast<QWidget*>(parent));
              Div* div = static_cast<Div*>(view);
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
             p->setStyleSheet(style);
        }
        else
        {
            view = new QLineEdit(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::Button:
    {
        if (parentType == EElementType::Div)
        {
             view = new QPushButton();
             QPushButton* widget = static_cast<QPushButton*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             widget->setStyleSheet(style);
             QString text = e.text();
             widget->setText(text);
        }
        else
        {
              view = new QPushButton(static_cast<QWidget*>(parent));
        }
        break;
    }

    case EElementType::P: {
        create(view, e, parent, parentType, type);
        break;
    }

    case EElementType::Span: {
         create(view, e, parent, parentType, type);
        break;
    }

    case EElementType::H1:
    {
        create(view, e, parent, parentType, type);
        break;
    }

    case EElementType::H2:
    {
        create(view, e, parent, parentType, type);
        break;
    }

    case EElementType::H3:
    {
        create(view, e, parent, parentType, type);
        break;
    }

    case EElementType::H4:
    {
        create(view, e, parent, parentType, type);
        break;
    }

    case EElementType::H5:
    {
        create(view, e, parent, parentType, type);
        break;
    }

    case EElementType::H6:
        create(view, e, parent, parentType, type);
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

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    QFile xmlFile("/home/student/Desktop/test.xml");
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

void MainWindow::create(QObject* view,
     QDomElement elem, QObject* parent,
     EElementType parentType, EElementType type)
{
    QString style = elem.attribute("style", "");
    QString text = elem.text();
    if (parentType == EElementType::Div)
    {
        view = new QLabel();
        QLabel* widget = static_cast<QLabel*>(view);
        static_cast<Div*>(parent)->addWidget(widget);

    QString newStyle = getStyle(type) + style;
        widget->setStyleSheet(newStyle);
        widget->setText(text);
    }
    else
    {
        view = new QLabel(static_cast<QWidget*>(parent));
    }
}

QString MainWindow::getStyle(EElementType type)
{
    switch (type)
    {
        case EElementType::P :
        {
            return "display : block;";
        }
        case EElementType::Span :
        {
            return "display : inline;";
        }
        case EElementType::H1 :
        {
            return "display : block; font-size : 32px; font-weight: bold;";
        }
        case EElementType::H2 :
        {
            return "display : block; font-size : 24px; font-weight: bold;";
        }
        case EElementType::H3 :
        {
            return "display : block; font-size : 19px; font-weight: bold;";
        }
        case EElementType::H4 :
        {
           return "display : block; font-size : 16px; font-weight: bold;";
        }
        case EElementType::H5 :
        {
            return "display : block; font-size : 13.5px; font-weight: bold;";
        }
        case EElementType::H6 :
        {
            return "display : block; font-size : 11px; font-weight: bold;";
        }
        default:
        {
            return "";
        }
    }
}
