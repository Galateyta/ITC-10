#include "downloadmanager.h"
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QTableWidget>
#include <QScrollArea>
#include <QListWidget>
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
    if ("select" == name) return EElementType::Select;
    if ("table" == name) return EElementType::Table;
    if ("img" == name) return EElementType::Img;
    if ("ul" == name) return EElementType::Ul;
    if ("ol" == name) return EElementType::Ol;

    return EElementType::Unknown;
}

QBoxLayout::Direction directionStringToEnum(QString direction)
{
    if ("column" == direction) return QBoxLayout::Direction::TopToBottom;
    if ("row" == direction) return QBoxLayout::Direction::LeftToRight;

    return QBoxLayout::Direction::TopToBottom;
}

Qt::Alignment alignmentStringToEnum(QString alignment)
{
    if ("left" == alignment || "start" == alignment) return Qt::AlignLeft;
    if ("right" == alignment || "end" == alignment) return Qt::AlignRight;
    if ("center" == alignment) return Qt::AlignHCenter;

    return Qt::AlignHCenter;
}

void MainWindow::parseElement(QDomElement e, QObject* parent, EElementType parentType)
{
    std::string name = e.tagName().toStdString();
    EElementType type = elementTypeToEnum(name);

    QObject* view = nullptr;


    switch (type) {
    case EElementType::Div:
        view = createDiv(view,e,parent,parentType);
        break;
    case EElementType::Select:
        createSelect(view,e,parent);
        break;

    case EElementType::Table:
        createTable(view,e,parent);
        break;

    case EElementType::Img:
        createImage(view,e,parent);
        break;

    case EElementType::Input:
        createInput(view,e,parent);
        break;

    case EElementType::Button:
        createButton(view,e,parent);
        break;

    case EElementType::P:
       createP(view,e,parent);
       break;

    case EElementType::Span:
        createSpan(view,e,parent);
        break;

    case EElementType::Ul:
    case EElementType::Ol:
        createOlAndUl(view,e,parent);
        break;

    case EElementType::TextArea:
        createTextArea(view,e,parent);
        break;

    case EElementType::H1:
        createH(view,e,parent,EElementType::H1);
        break;

    case EElementType::H2:
        createH(view,e,parent,EElementType::H2);
        break;

    case EElementType::H3:
        createH(view,e,parent,EElementType::H3);
        break;

    case EElementType::H4:
        createH(view,e,parent,EElementType::H4);
        break;

    case EElementType::H5:
        createH(view,e,parent,EElementType::H5);
        break;

    case EElementType::H6:
        createH(view,e,parent,EElementType::H6);
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
    mDownloadManager = new DownloadManager(this);
    connect(mDownloadManager, SIGNAL(finished(void*, QByteArray)),
            this, SLOT(onDownloadFinished(void*, QByteArray)));


    QFile xmlFile("/home/hunan/Desktop/test.xml");
    xmlFile.open(QIODevice::ReadOnly | QIODevice::Text);
    QDomDocument d;
    d.setContent(xmlFile.readAll());

    QDomElement root = d.firstChildElement();
    parseElement(root, nullptr, EElementType::Unknown);

    QScrollArea* scroll = new QScrollArea(this);
    scroll->setWidget(mLayout);
    scroll->setWidgetResizable(true);
    setCentralWidget(scroll);
}

void MainWindow::onDownloadFinished(void* usrPtr, QByteArray data)
{
    QLabel* label = static_cast<QLabel*>(usrPtr);
    QPixmap pix;
    pix.loadFromData(data);
    label->setPixmap(pix);
}

void MainWindow::createButton(QObject* view, QDomElement e, QObject* parent)
{
         QString style = e.attribute("style");
         QString value = e.text();

         view = new QPushButton();
         QPushButton* widget = static_cast<QPushButton*>(view);
         static_cast<Div*>(parent)->addWidget(widget);

         widget->setStyleSheet(style);
         widget->setText(value);
         int w = widget->fontMetrics().width(value);
         widget->setFixedWidth(w + 20);

}

void MainWindow::createInput(QObject* view, QDomElement e, QObject* parent)
{
    QString style = e.attribute("style");
    QString tagType = e.attribute("type");
    QString value = e.text();

    if (tagType == "text" || !tagType.length())
    {
         view = new QLineEdit();
         QLineEdit* widget = static_cast<QLineEdit*>(view);
         Div* p = static_cast<Div*>(parent);
         p->addWidget(widget);
         widget->setStyleSheet(style);

    } else if (tagType == "checkbox")
    {
         view = new QCheckBox();
         QCheckBox* widget = static_cast<QCheckBox*>(view);
         Div* p = static_cast<Div*>(parent);
         p->addWidget(widget);
         widget->setText(value);
         widget->setStyleSheet(style);

    }  else if (tagType == "radio")
    {
             view = new QRadioButton();
             QRadioButton* widget = static_cast<QRadioButton*>(view);
             Div* p = static_cast<Div*>(parent);
             p->addWidget(widget);
             widget->setText(value);
             widget->setStyleSheet(style);
    }

}

void MainWindow::createSelect(QObject* view, QDomElement e, QObject *parent)
{
    QString style = e.attribute("style");
    view = new QComboBox();
    QComboBox* combobox = static_cast<QComboBox*>(view);
    combobox->setStyleSheet(style);

    for (int i = 0; i < e.childNodes().size(); ++i)
    {
        combobox->addItem(e.childNodes().at(i).toElement().text());
    }

    static_cast<Div*>(parent)->addWidget(combobox);

}

void MainWindow::createSpan(QObject* view, QDomElement e, QObject *parent)
{
    createP(view,e,parent);
}

void MainWindow::createP(QObject* view, QDomElement e, QObject *parent)
{
    QString style = e.attribute("style");
    QString value = e.text();

    view = new QLabel();
    QLabel* widget = static_cast<QLabel*>(view);
    static_cast<Div*>(parent)->addWidget(widget);
    widget->setStyleSheet(style);
    widget->setWordWrap(true);
    widget->setText(value);

    QSize size = widget->sizeHint();
    widget->setMinimumSize(size);
}

void MainWindow::createImage(QObject* view, QDomElement e, QObject *parent)
{
    QString style = e.attribute("style");

    view = new QLabel();
    QLabel* label = static_cast<QLabel*>(view);
    label->setStyleSheet(style);
    QString src = e.attribute("src", "");
    mDownloadManager->start(src, label);

    static_cast<Div*>(parent)->addWidget(label);
}

void MainWindow::createTable(QObject* view, QDomElement e, QObject *parent)
{
    QString style = e.attribute("style");

    view = new QTableWidget();
    QTableWidget* table = static_cast<QTableWidget*>(view);
    table->setStyleSheet(style);

    QDomElement headersElem = e.firstChild().toElement();
    table->setColumnCount(headersElem.childNodes().size());
    QStringList headers;
    for (int i = 0; i < headersElem.childNodes().size(); ++i)
    {
        headers.push_back(headersElem.childNodes().at(i).toElement().text());
    }

    table->setRowCount(e.childNodes().size() - 1);
    table->setHorizontalHeaderLabels(headers);

    for (int i = 1; i < e.childNodes().size(); ++i)
    {
        const QDomNodeList& childs = e.childNodes().at(i).childNodes();
        for (int j = 0; j < childs.size(); ++j)
        {
            QTableWidgetItem* item = new QTableWidgetItem(childs.at(j).toElement().text());
            table->setItem(i - 1, j, item);
        }
    }

    static_cast<Div*>(parent)->addWidget(table);

}

void MainWindow::createH(QObject* view, QDomElement e, QObject *parent,EElementType type)
{
    switch (type) {
    case EElementType::H1: {
         QString style = "font-size: 24pt;font-weight: bold";
         addText(view,e,parent,style);
         break;
    }
    case EElementType::H2: {
         QString style = "font-size: 18pt;font-weight: bold";
         addText(view,e,parent,style);
         break;
        }
    case EElementType::H3: {
         QString style = "font-size: 14pt;font-weight: bold";
         addText(view,e,parent,style);
         break;
        }
    case EElementType::H4: {
         QString style = "font-size: 12pt;font-weight: bold";
         addText(view,e,parent,style);
         break;
        }
    case EElementType::H5: {
         QString style = "font-size: 10pt;font-weight: bold";
         addText(view,e,parent,style);
         break;
        }
    case EElementType::H6: {
         QString style = "font-size: 9pt;font-weight: bold";
         addText(view,e,parent,style);
         break;
        }
     }
}

void MainWindow::addText(QObject* view, QDomElement e, QObject *parent, QString style)
{
    QString value = e.text();
    view = new QLabel();
    QLabel* widget = static_cast<QLabel*>(view);
    static_cast<Div*>(parent)->addWidget(widget);
    widget->setStyleSheet(style);
    widget->setText(value);
}

void MainWindow::createTextArea(QObject* view, QDomElement e, QObject *parent)
{
    QString style = e.attribute("style");
    QString value = e.text();

    view = new QTextEdit();
    QTextEdit* widget = static_cast<QTextEdit*>(view);
    static_cast<Div*>(parent)->addWidget(widget);
    widget->setStyleSheet(style);
    widget->setText(value);
}

QObject* MainWindow::createDiv(QObject* view, QDomElement e, QObject *parent, EElementType parentType)
{
    QString style = e.attribute("style");
    QBoxLayout::Direction direction = directionStringToEnum(e.attribute("flex-direction"));
    Qt::Alignment alignment = alignmentStringToEnum(e.attribute("justify-content"));
    if (parentType == EElementType::Div)
    {
         view = new Div();
         Div* layout = static_cast<Div*>(view);
         static_cast<Div*>(parent)->addDiv(layout);
         layout->setStyleSheet(style);
         layout->setDirection(direction);
         layout->setAlignment(alignment);
    }
    else
    {
          view = new Div(static_cast<QWidget*>(parent));
          Div* div = static_cast<Div*>(view);
          div->setStyleSheet(style);
          div->setDirection(direction);
          div->setAlignment(alignment);

    }
    return view;
}

void MainWindow::createOlAndUl(QObject* view, QDomElement e, QObject* parent)
{
    QString style = e.attribute("style");

    view = new QListWidget();
    QListWidget* list = static_cast<QListWidget*>(view);
    int count = e.childNodes().size();
    for (int i = 0; i < count; i++)
    {
        if(e.tagName() == "ul")
        {
            QString styleUl = "* ";
            list->addItem(styleUl + e.childNodes().at(i).toElement().text());
        }else
        {
            QString num = (QString::number(i + 1) + ". ");
            list->addItem(num + e.childNodes().at(i).toElement().text());
         }

        list->setStyleSheet(style);
     }
     static_cast<Div*>(parent)->addWidget(list);

}
MainWindow::~MainWindow()
{
    delete ui;
}

