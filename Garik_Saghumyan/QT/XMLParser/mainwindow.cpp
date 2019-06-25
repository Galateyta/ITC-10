#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QLabel>
#include <QTextEdit>
#include <QColor>
#include <QRadioButton>
#include <QCheckBox>
#include <QComboBox>
#include <QTableWidget>




EElementType elementTypeToEnum(QString name)
{
    if ("div" == name) return  EElementType::Div;
    if ("input" == name) return  EElementType::Input;
    if ("button" == name) return  EElementType::Button;
    if ("p" == name || "span" == name || "h1" == name || "h2" == name || "h3" == name || "h4" == name || "h5" == name || "h6" == name)
        return EElementType::Text;
    if("select" == name) return EElementType::Select;
    if("table" == name) return EElementType::Table;
    if("img" == name) return EElementType::Img;
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
    case EElementType::Select: {
        if (parentType == EElementType::Div)
        {
            view = new QComboBox();
            QComboBox* combobox = static_cast<QComboBox*>(view);
            combobox->setStyleSheet(style);
            QDomNodeList childs = e.childNodes();
            for (int i = 0; i < childs.length(); ++i)
            {
                combobox->addItem(e.childNodes().at(i).toElement().text());
            }
            static_cast<Div*>(parent)->addWidget(combobox);
        }
        else
        {

        }
        break;
    }
    case EElementType::Table: {
        if (parentType == EElementType::Div)
        {
            view = new QTableWidget();
            QTableWidget* table = static_cast<QTableWidget*>(view);
            table->setStyleSheet(style);
            QDomElement headerelement = e.firstChild().toElement();
            QStringList headers;
            table->setColumnCount(headerelement.childNodes().size());

            for (int i = 0; i < headerelement.childNodes().size(); i++)
            {
                headers.push_back(headerelement.childNodes().at(i).toElement().text());
            }
            table->setHorizontalHeaderLabels(headers);
            table->setRowCount(e.childNodes().size()-1);
//            table->setSizePolicy(QSizePolicy::Ignored, QSizePolicy::Ignored);
            for (int i = 1; i < e.childNodes().size(); ++i)
            {
               const QDomNodeList& childs = e.childNodes().at(i).childNodes();
               for (int j = 0; j < childs.size(); ++j)
               {
                    QTableWidgetItem* item = new QTableWidgetItem(childs.at(j).toElement().text());
                    table->setItem(i-1,j, item);
               }
            }
            static_cast<Div*>(parent)->addWidget(table);
        }
        else
        {

        }
        break;
    }
    case EElementType::Img: {
        if (parentType == EElementType::Div)
        {
            view = new QLabel();
            QLabel* label = static_cast<QLabel*>(view);
            label->setStyleSheet(style);
            QString src = e.attribute("src", "");
            if(!src.size()) break;
            QPixmap img(src);
            label->setPixmap(img);
            label->setScaledContents(true);
            label->setSizePolicy(QSizePolicy::Ignored, QSizePolicy::Ignored);
            label->setMinimumSize(200, 200);
            static_cast<Div*>(parent)->addWidget(label);
        }
        else
        {

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
                p.setColor(QPalette::Base, QColor(245, 245, 255));
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
                widget->setWordWrap(true);
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
              QLabel* widget = static_cast<QLabel*>(view);
              widget->setStyleSheet(style);
              widget->setText(value);
              widget->setWordWrap(true);
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

    QFile xmlFile("/home/student/ITC-10/Garik_Saghumyan/QT/test.xml");
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
