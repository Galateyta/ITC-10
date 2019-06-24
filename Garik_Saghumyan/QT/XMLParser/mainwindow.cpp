#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QLabel>
#include <QTextEdit>
#include <QColor>
#include <QRadioButton>
#include <QCheckBox>




EElementType elementTypeToEnum(QString name)
{
    if ("div" == name) return  EElementType::Div;
    if ("input" == name) return  EElementType::Input;
    if ("button" == name) return  EElementType::Button;
    if ("p" == name || "span" == name || "h1" == name || "h2" == name || "h3" == name || "h4" == name || "h5" == name || "h6" == name)
        return EElementType::Text;

    return EElementType::Unknown;
}

void MainWindow::parseElement(QDomElement e, QObject* parent, EElementType parentType)
{
   // qDebug() << e.tagName();
    QString name = e.tagName();
    EElementType type = elementTypeToEnum(name);

    QObject* view = nullptr;

    QDomNamedNodeMap attributes = e.attributes();
    QString style = e.attribute("style");
    QString inputType = e.attribute("type");
    QString value = e.text();
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
            if(inputType == "radio"){
                view = new QRadioButton();
                QWidget* widget = static_cast<QWidget*>(view);
                Div* p = static_cast<Div*>(parent);
                p->addWidget(widget);
                p->setStyleSheet(style);
            }
            else if (inputType == "checkbox")
            {
                view = new QCheckBox();
                QWidget* widget = static_cast<QWidget*>(view);
                Div* p = static_cast<Div*>(parent);
                p->addWidget(widget);
                p->setStyleSheet(style);
            }
            else
            {
                view = new QLineEdit();
                QWidget* widget = static_cast<QWidget*>(view);
                Div* p = static_cast<Div*>(parent);
                p->addWidget(widget);
                p->setStyleSheet(style);
            }
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
             widget->setStyleSheet(style);
             widget->setText(value);

        }
        else
        {
              view = new QPushButton(static_cast<QWidget*>(parent));

        }
        break;
    }
    case EElementType::Text: {
        if (parentType == EElementType::Div)
        {
            if (name == "span")
            {
                view = new QTextEdit();
                QTextEdit* widget = static_cast<QTextEdit*>(view);
                static_cast<Div*>(parent)->addWidget(widget);
                QPalette p =  widget->palette();
                p.setColor(QPalette::Base, QColor(255, 255, 255));
                widget->setPalette(p);
                widget->setReadOnly(true);
                widget->setPlainText(value);
                widget->setStyleSheet(style);

            }
            else
            {
                view = new QLabel();
                QLabel* widget = static_cast<QLabel*>(view);
                static_cast<Div*>(parent)->addWidget(widget);
                widget->setStyleSheet(style);
                widget->setText(value);
                QFont font = widget->font();
                if (name == "h1")
                {
                    font.setPixelSize(32);
                    font.setBold(true);
                    widget->setFont(font);
                }
                else if (name == "h2")
                {
                    font.setPixelSize(24);
                    font.setBold(true);
                    widget->setFont(font);
                }
                else if (name == "h3")
                {
                    font.setPixelSize(19);
                    font.setBold(true);
                    widget->setFont(font);
                }
                else if (name == "h4")
                {
                    font.setPixelSize(16);
                    font.setBold(true);
                    widget->setFont(font);
                }
                else if (e.tagName() == "h5")
                {
                    font.setPixelSize(13);
                    font.setBold(true);
                    widget->setFont(font);
                }
                else if (name == "h6")
                {
                    font.setPixelSize(12);
                    font.setBold(true);
                    widget->setFont(font);
                }
            }

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

    QFile xmlFile("/home/garik/ITC-10/ITC-10/Garik_Saghumyan/QT/test.xml");
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
