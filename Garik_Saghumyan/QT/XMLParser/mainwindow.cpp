#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QLabel>
#include <QTextEdit>
#include <QColor>
#include <QRadioButton>
#include <QCheckBox>
#include <QComboBox>
#include <QTableWidget>
#include <QListWidget>
#include <QScrollArea>
#include <QImage>

EElementType elementTypeToEnum(QString name)
{
    if ("div" == name) return  EElementType::Div;
    if ("input" == name) return  EElementType::Input;
    if ("button" == name) return  EElementType::Button;
    if("textarea" == name) return EElementType::Textarea;
    if ("p" == name || "span" == name || "h1" == name || "h2" == name || "h3" == name || "h4" == name || "h5" == name || "h6" == name)
        return EElementType::Text;
    if("select" == name) return EElementType::Select;
    if("table" == name) return EElementType::Table;
    if("img" == name) return EElementType::Img;
    if("ul" == name || "ol" == name) return EElementType::List;
    return EElementType::Unknown;
}
void MainWindow::setPixelsToHeaders(QLabel* label, QFont font, int pixels)
{
    font.setPixelSize(pixels);
    font.setBold(true);
    label->setFont(font);
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
    case EElementType::Textarea: {
        if (parentType == EElementType::Div)
        {
            view = new QTextEdit();
            QTextEdit* widget = static_cast<QTextEdit*>(view);
            static_cast<Div*>(parent)->addWidget(widget);
            widget->setPlainText(value);
            widget->setStyleSheet(style);
        }
        else
        {

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
    case EElementType::List: {
        if (parentType == EElementType::Div)
        {
            view = new QListWidget();
            QListWidget* list = static_cast<QListWidget*>(view);
            list->setStyleSheet(style);
            qDebug() << e.tagName();
            for (int i = 0; i < e.childNodes().size(); i++)
            {
                if(e.tagName() == "ol")
                {
                    list->addItem(QString::number(i + 1) + "." + e.childNodes().at(i).toElement().text());
                }
                else
                {
                    list->addItem(e.childNodes().at(i).toElement().text());
                }

            }
            static_cast<Div*>(parent)->addWidget(list);
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
            QImage img(src);
            QPixmap pix = QPixmap::fromImage(img);
            label->setPixmap(pix);
            label->setScaledContents(true);
            label->setSizePolicy(QSizePolicy::Ignored, QSizePolicy::Ignored);
            label->setMinimumSize(100, 100);
            static_cast<Div*>(parent)->addWidget(label);
        }
        else
        {
            view = new QLabel(static_cast<QWidget*>(parent));
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
            view = new QLabel();
            QLabel* widget = static_cast<QLabel*>(view);
            static_cast<Div*>(parent)->addWidget(widget);
            widget->setStyleSheet(style);
            widget->setText(value);
            widget->setWordWrap(true);
            QFont font = widget->font();
            if (name == "h1")
            {
                setPixelsToHeaders(widget, font, 32 );
            }
            else if (name == "h2")
            {
                setPixelsToHeaders(widget, font, 24 );
            }
            else if (name == "h3")
            {
                setPixelsToHeaders(widget, font, 19 );
            }
            else if (name == "h4")
            {
                setPixelsToHeaders(widget, font, 16 );
            }
            else if (e.tagName() == "h5")
            {
                setPixelsToHeaders(widget, font, 13 );
            }
            else if (name == "h6")
            {
                setPixelsToHeaders(widget, font, 12 );
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

    QFile xmlFile("/home/garik/ITC-10/ITC-10/Garik_Saghumyan/QT/test.xml");
    xmlFile.open(QIODevice::ReadOnly | QIODevice::Text);
    QDomDocument d;
    d.setContent(xmlFile.readAll());

    QDomElement root = d.firstChildElement();
    parseElement(root, nullptr, EElementType::Unknown);
    QVBoxLayout * l = new QVBoxLayout();
    QScrollArea* scroll = new QScrollArea();
    scroll->setWidget(mLayout);
//    scroll->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOn);
    scroll->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOn);
    scroll->setWidgetResizable(true);
    l->addWidget(mLayout);
    setCentralWidget(scroll);
    centralWidget()->setLayout(l);

}

MainWindow::~MainWindow()
{
    delete ui;
}
