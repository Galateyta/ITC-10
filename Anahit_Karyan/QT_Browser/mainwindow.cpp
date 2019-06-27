#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "downloadmanager.h"
#include <QSize>

EElementType elementTypeToEnum(std::string name)
{
    if ("div" == name) return  EElementType::Div;
    if ("input" == name) return  EElementType::Input;
    if ("button" == name) return  EElementType::Button;
    if ("select" == name) return  EElementType::Select;
    if ("table" == name) return  EElementType::Table;
    if ("img" == name) return  EElementType::Img;
    if ("textarea" == name) return  EElementType::Textarea;
    if ("p" == name || "span" == name || "h1" == name ||
        "h2" == name || "h3" == name || "h4" == name ||
        "h5" == name || "h6" == name ) return  EElementType::Text;
    if ("ul" == name || "ol" == name ) return  EElementType::List;

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
QObject* MainWindow::createDiv(QObject* view, QObject* parent,QString style, QBoxLayout::Direction direction, Qt::Alignment alignment)
{
    view = new Div();
    Div* layout = static_cast<Div*>(view);
    static_cast<Div*>(parent)->addDiv(layout);
    layout->setStyleSheet(style);
    layout->setDirection(direction);
    layout->setAlignment(alignment);
    return view;
}
void MainWindow::createInput(QObject* view, QObject* parent, QString inputType, QString text, QString style){
    if("checkbox" == inputType)
    {
        view = new QCheckBox(text);
    }
    else  if("radio" == inputType)
    {
        view = new QRadioButton(text);
    }
    else
    {
        view = new QLineEdit(text);
    }

    QWidget* widget = static_cast<QWidget*>(view);

    widget->setStyleSheet(style);
    Div* p = static_cast<Div*>(parent);
    p->addWidget(widget);
}
void MainWindow::createButton(QObject* view, QObject* parent, QString text, QString style)
{
    view = new QPushButton(text);
    QPushButton* widget = static_cast<QPushButton*>(view);

    widget->setStyleSheet(style);
    Div* p = static_cast<Div*>(parent);
    p->addWidget(widget);
}
void MainWindow::createTextarea(QObject* view, QObject* parent, QString text, QString style)
{
    view = new QTextEdit(text);
    QWidget* widget = static_cast<QWidget*>(view);

    widget->setStyleSheet(style);
    Div* p = static_cast<Div*>(parent);
    p->addWidget(widget);
}
void MainWindow::createSelect(QObject* view, QDomElement e, QObject* parent, QString style)
{
    view = new QComboBox();
    QComboBox* combobox= static_cast<QComboBox*>(view);

    for(int i = 0; i < e.childNodes().length(); ++i)
    {
        combobox->addItem(e.childNodes().at(i).toElement().text());
    }

    combobox->setStyleSheet(style);
    Div* p = static_cast<Div*>(parent);
    p->addWidget(combobox);
}
void MainWindow::createTable(QObject* view, QDomElement e, QObject* parent, QString style)
{
    view = new QTableWidget();
    QTableWidget* table= static_cast<QTableWidget*>(view);
    QDomElement headersElem =  e.firstChild().toElement();
    table->setColumnCount(headersElem.childNodes().size());
    QStringList headers;

    for(int i = 0; i < headersElem.childNodes().size(); ++i)
    {
       headers.push_back(headersElem.childNodes().at(i).toElement().text());
    }

    table->setRowCount(e.childNodes().size()-1);
    table->setHorizontalHeaderLabels(headers);

    for(int i = 1; i < e.childNodes().size(); ++i)
    {
        const QDomNodeList& childs =  e.childNodes().at(i).childNodes();
        for(int j = 0; j < childs.size(); ++j)
        {
            QTableWidgetItem* item = new QTableWidgetItem(childs.at(j).toElement().text());
            table->setItem(i-1,j,item);
        }
    }

    table->setStyleSheet(style);
    Div* p = static_cast<Div*>(parent);
    p->addWidget(table);
}
void MainWindow::createImg(QObject* view, QDomElement e, QObject* parent, QString style)
{
    view = new QLabel();
    QLabel* label = static_cast<QLabel*>(view);
    QString src = e.attribute("src", "");
    //if (!src.size()) break;
    mDownloadManager->start(src, label);

    label->setStyleSheet(style);
    Div* p = static_cast<Div*>(parent);
    p->addWidget(label);
}
void MainWindow::createText(QObject* view, QObject* parent, QString text, QString style, std::string name)
{
    view = new QLabel(text);
    QLabel* widget = static_cast<QLabel*>(view);
    widget->setWordWrap(true);
    if("h1" == name || "h2" == name || "h3" == name || "h4" == name || "h5" == name ||"h6" == name){
        QFont font = widget->font();
        font.setBold(true);

        if("h1" == name)
        {
             font.setPointSize(32);
        }
        else if("h2" == name)
        {
             font.setPointSize(24);
        }
        else if("h3" == name)
        {
             font.setPointSize(18.72);
        }
        else if("h4" == name)
        {
             font.setPointSize(16);
        }
        else if("h5" == name)
        {
             font.setPointSize(13.28);
        }
        else if("h6" == name)
        {
             font.setPointSize(12);
        }
        widget->setFont(font);
   }

    widget->setStyleSheet(style);
    Div* p = static_cast<Div*>(parent);
    p->addWidget(widget);
}
void MainWindow::createList(QObject* view, QDomElement e, QObject* parent, QString style, std::string name)
{
    view = new QListWidget();
    QListWidget* list = static_cast<QListWidget*>(view);
    QString listStyle;

    for (int i = 0; i < e.childNodes().size(); ++i)
    {
        QString listStyle;
        if("ol" == name)
        {
           listStyle = QChar(0x2022);
        }
        else if("ul" == name)
        {
           listStyle =  QString::number(i+1) + ".";
        }
        const QDomNodeList& childs = e.childNodes();
        QString text = listStyle + childs.at(i).toElement().text();
        QListWidgetItem* item = new QListWidgetItem(text);
        list->addItem(item);
    }

    list->setStyleSheet(style);
    Div* p = static_cast<Div*>(parent);
    p->addWidget(list);
}

void MainWindow::parseElement(QDomElement e, QObject* parent)
{
    std::string name = e.tagName().toStdString();
    QString  text = e.text();
    EElementType type = elementTypeToEnum(name);

    QObject* view = nullptr;

    QDomNamedNodeMap attributes = e.attributes();
    QString style = e.attribute("style");
    QBoxLayout::Direction direction = directionStringToEnum(e.attribute("flex-direction"));
    QString value = e.text();
    QString nv = e.nodeValue();
    QString data = e.toText().data();
    QString inputType = e.attribute("type");
    Qt::Alignment alignment = alignmentStringToEnum(e.attribute("justify-content"));

    switch (type)
    {
        case EElementType::Div:
        {
            createDiv(view,parent,style, direction, alignment );
            break;
        }
        case EElementType::Img:
        {
            createImg(view, e, parent, style);
            break;
        }
        case EElementType::Text:
        {
            createText(view, parent, text, style, name);
            break;
        }
        case EElementType::Select:
        {
            createSelect(view, e, parent, style);
            break;
        }
        case EElementType::Table:
        {
            createTable(view, e, parent, style);
            break;
        }
        case EElementType::List:
        {
             createList(view, e, parent, style, name);
             break;
        }
        case EElementType::Input:
        {
            createInput(view, parent, inputType, text, style);
            break;
        }
        case EElementType::Textarea:
        {
            createTextarea(view, parent, text, style);
            break;
        }
        case EElementType::Button:
        {
            createButton(view, parent, text, style);
            break;
        }
        case EElementType::Unknown:
        {
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
        parseElement(childs.at(i).toElement(), view);
    }
}

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    mDownloadManager = new DownloadManager(this);
    connect(mDownloadManager, SIGNAL(finished(void*, QByteArray)),
            this, SLOT(onDownloadFinished(void*, QByteArray)));

    QFile xmlFile("/home/anahit/Desktop/test.xml");
    xmlFile.open(QIODevice::ReadOnly | QIODevice::Text);
    QDomDocument d;
    d.setContent(xmlFile.readAll());

    QDomElement root = d.firstChildElement();
    parseElement(root, nullptr);

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

MainWindow::~MainWindow()
{
    delete ui;
}

