#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QSize>



EElementType elementTypeToEnum(std::string name)
{
    if ("div" == name) return  EElementType::Div;
    if ("input" == name) return  EElementType::Input;
    if ("button" == name) return  EElementType::Button;
    if ("p" == name) return  EElementType::P;
    if ("h1" == name) return  EElementType::H1;
    if ("h2" == name) return  EElementType::H2;
    if ("h3" == name) return  EElementType::H3;
    if ("h4" == name) return  EElementType::H4;
    if ("h5" == name) return  EElementType::H5;
    if ("h6" == name) return  EElementType::H6;
    if ("span" == name) return  EElementType::Span;
    if ("textarea" == name) return  EElementType::TextArea;




    return EElementType::Unknown;
}

void MainWindow::parseElement(QDomElement e, QObject* parent, EElementType parentType)
{
   // qDebug() << e.tagName();
    std::string name = e.tagName().toStdString();
    EElementType type = elementTypeToEnum(name);

    QObject* view = nullptr;

    QDomNamedNodeMap attributes = e.attributes();
    QString style = e.attribute("style");
//    for (int i = 0; i < attributes.size(); ++i)
//    {
//        qDebug() << attributes.item(i).nodeValue();
//    }
    QString value = e.text();
//    qDebug()<< value;
    QString tagType = e.attribute("type");

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
              div->setStyleSheet(style);
        }
        break;
    }
    case EElementType::Input: {
        if (tagType == "text")
        {

            if (parentType == EElementType::Div)
            {
                 view = new QLineEdit();
                 QWidget* widget = static_cast<QWidget*>(view);
                 Div* p = static_cast<Div*>(parent);
                 p->addWidget(widget);
            }
            else
            {
                  view = new QLineEdit(static_cast<QWidget*>(parent));
            }
        } else if (tagType == "checkbox")
        {

            if (parentType == EElementType::Div)
            {
                 view = new QCheckBox();
                 QWidget* widget = static_cast<QWidget*>(view);
                 Div* p = static_cast<Div*>(parent);
                 p->addWidget(widget);
            }
            else
            {
                  view = new QCheckBox(static_cast<QWidget*>(parent));
            }
        }  else if (tagType == "radio")
        {

            if (parentType == EElementType::Div)
            {
                 view = new QRadioButton();
                 QWidget* widget = static_cast<QWidget*>(view);
                 Div* p = static_cast<Div*>(parent);
                 p->addWidget(widget);
            }
            else
            {
                  view = new QRadioButton(static_cast<QWidget*>(parent));
            }
        }
        break;
        }
    case EElementType::Button: {
        if (parentType == EElementType::Div)
        {
             view = new QPushButton();
             QPushButton* widget = static_cast<QPushButton*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             widget->setStyleSheet(style);
             widget->setText(value);

        }
        else
        {
              view = new QPushButton(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::P: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             widget->setStyleSheet(style);
             widget->setText(value);
             widget->setWordWrap(true);

             QSize size = widget->sizeHint();
             widget->setMinimumSize(size);

        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::Span: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             widget->setStyleSheet(style);
             widget->setText(value);
             widget->setWordWrap(true);

             QSize size = widget->sizeHint();
             widget->setMinimumSize(size);

        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::TextArea: {
        if (parentType == EElementType::Div)
        {
             view = new QTextEdit();
             QTextEdit* widget = static_cast<QTextEdit*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             widget->setStyleSheet(style);
             widget->setText(value);
        }
        else
        {
              view = new QTextEdit(static_cast<QWidget*>(parent));
        }
        break;
    }

    case EElementType::H1: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             style="font-size: 24pt;font-weight: bold";
             widget->setStyleSheet(style);
             widget->setText(value);
        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
              QLabel* widget = static_cast<QLabel*>(view);
              style="font-size: 24pt;font-weight: bold; background-color: yellow";

              widget->setStyleSheet(style);
              widget->setText(value);
        }
        break;
    }
    case EElementType::H2: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             style=" font-size: 18pt;font-weight: bold";
             widget->setStyleSheet(style);
             widget->setText(value);

        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::H3: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             style=" font-size: 14pt;font-weight: bold";
             widget->setStyleSheet(style);
             widget->setText(value);

        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::H4: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             style="font-size: 12pt;font-weight: bold";
             widget->setStyleSheet(style);
             widget->setText(value);

        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::H5: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             style="font-size: 10pt;font-weight: bold";
             widget->setStyleSheet(style);
             widget->setText(value);

        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::H6: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             style="font-size: 9pt;font-weight: bold";
             widget->setStyleSheet(style);
             widget->setText(value);

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

    QFile xmlFile("/home/hunan/Desktop/test.xml");
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
