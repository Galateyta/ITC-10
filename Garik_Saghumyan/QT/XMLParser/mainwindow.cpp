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
    if ("div" == name || "body" == name) return  EElementType::Div;
    if ("input" == name) return  EElementType::Input;
    if ("button" == name) return  EElementType::Button;
    if ("textarea" == name) return EElementType::Textarea;
    if ("p" == name || "span" == name || "h1" == name || "h2" == name || "h3" == name || "h4" == name || "h5" == name || "h6" == name)
        return EElementType::Text;
    if ("select" == name) return EElementType::Select;
    if ("table" == name) return EElementType::Table;
    if ("img" == name) return EElementType::Img;
    if ("ul" == name || "ol" == name) return EElementType::List;
    return EElementType::Unknown;
}

EElementType headersToEnum(QString name)
{
    if ("h1" == name) return EElementType::H1;
    if ("h2" == name) return EElementType::H2;
    if ("h3" == name) return EElementType::H3;
    if ("h4" == name) return EElementType::H4;
    if ("h5" == name) return EElementType::H5;
    if ("h6" == name) return EElementType::H6;
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

void MainWindow::setPixelsToHeaders(QLabel* label, QFont font, int pixels)
{
    font.setPixelSize(pixels);
    font.setBold(true);
    label->setFont(font);
}

QObject* MainWindow::addDivElement(QObject* view, QObject* parent, EElementType parentType, QString style, QBoxLayout::Direction direction,  Qt::Alignment alignment)
{
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

void MainWindow::addInputElements(QObject *view, QObject *parent, EElementType parentType, QString style, QString inputType, QString value)
{
    if (parentType == EElementType::Div)
    {
        if(inputType == "radio"){
            view = new QRadioButton();
            QRadioButton* widget = static_cast<QRadioButton*>(view);
            Div* p = static_cast<Div*>(parent);
            p->addWidget(widget);
            widget->setText(value);
            p->setStyleSheet(style);

        }
        else if (inputType == "checkbox")
        {
            view = new QCheckBox();
            QCheckBox* widget = static_cast<QCheckBox*>(view);
            Div* p = static_cast<Div*>(parent);
            p->addWidget(widget);
            widget->setText(value);
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
}

void MainWindow::addTextAreaElements(QObject *view, QObject *parent, EElementType parentType, QString style, QString value)
{
    if (parentType == EElementType::Div)
    {
        view = new QTextEdit();
        QTextEdit* widget = static_cast<QTextEdit*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
        widget->setPlainText(value);
        widget->setStyleSheet(style);
    }
}

void MainWindow::addSelectElements(QObject *view, QObject *parent, EElementType parentType, QDomElement e, QString style)
{
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
}

void MainWindow::addListElements(QObject *view, QObject *parent, EElementType parentType, QDomElement e, QString style)
{
    if (parentType == EElementType::Div)
    {
        view = new QListWidget();
        QListWidget* list = static_cast<QListWidget*>(view);
        list->setStyleSheet(style);
        for (int i = 0; i < e.childNodes().size(); i++)
        {
            if(e.tagName() == "ol")
            {
                list->addItem(QString::number(i + 1) + "." + e.childNodes().at(i).toElement().text());
            }
            else
            {
                list->addItem(QChar(0x2022) + e.childNodes().at(i).toElement().text());
            }

        }
        static_cast<Div*>(parent)->addWidget(list);
    }
}

void MainWindow::addTableElements(QObject *view, QObject *parent, EElementType parentType, QDomElement e, QString style)
{
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

}

void MainWindow::addButtonElements(QObject *view, QObject *parent, EElementType parentType, QString style, QString value)
{
    if (parentType == EElementType::Div)
    {
         view = new QPushButton();
         QPushButton* widget = static_cast<QPushButton*>(view);
         static_cast<Div*>(parent)->addWidget(widget);
         widget->setStyleSheet(style);
         widget->setText(value);
         int w = widget->fontMetrics().width(value);
         widget->setFixedWidth(w + 30);
    }
}

void MainWindow::addImageElemets(QObject *view, QObject *parent, EElementType parentType, QDomElement e, QString style, QString src)
{
    if (parentType == EElementType::Div)
    {
        view = new QLabel();
        QLabel* label = static_cast<QLabel*>(view);
        label->setStyleSheet(style);
        label->setScaledContents(true);
        QString regexp = "(http(s)?://)([\w-]+\.)+[\w-]+(/[\w- ;,./?%&=]*)?";
        QRegExp rx(regexp);
        rx.indexIn(src);
        if(rx.cap(0).length() != 0)
         {
              download->startImage(src, label);
         }
         else
         {
              QPixmap pix(src);
              label->setPixmap(pix.scaled(label->width(),label->height(),Qt::KeepAspectRatio));
         }
         static_cast<Div*>(parent)->addWidget(label);
    }

}

void MainWindow::addTextElements(QObject *view, QObject *parent, EElementType parentType, QString style, QString value, EElementType headerName)
{
    if (parentType == EElementType::Div)
    {
        view = new QLabel();
        QLabel* widget = static_cast<QLabel*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
        widget->setStyleSheet(style);
        widget->setText(value);
        widget->setWordWrap(true);
        QFont font = widget->font();
        switch (headerName)
        {
            case EElementType::H1:
            {
                setPixelsToHeaders(widget, font, 32);
                break;
            }
            case EElementType::H2:
            {
                setPixelsToHeaders(widget, font, 24);
                break;
            }
            case EElementType::H3:
            {
                setPixelsToHeaders(widget, font, 19);
                break;
            }
            case EElementType::H4:
            {
                setPixelsToHeaders(widget, font, 16);
                break;
            }
            case EElementType::H5:
            {
                setPixelsToHeaders(widget, font, 13);
                break;
            }
            case EElementType::H6:
            {
                setPixelsToHeaders(widget, font, 12);
                break;
            }
        }
    }
}

void MainWindow::parseElement(QDomElement e, QObject* parent, EElementType parentType)
{
    QString name = e.tagName();
    EElementType type = elementTypeToEnum(name);
    EElementType headerName = headersToEnum(name);
    QObject* view = nullptr;
    QDomNamedNodeMap attributes = e.attributes();
    QBoxLayout::Direction direction = directionStringToEnum(e.attribute("flex-direction"));
    Qt::Alignment alignment = alignmentStringToEnum(e.attribute("justify-content"));
    QString style = e.attribute("style");
    QString inputType = e.attribute("type");
    QString src = e.attribute("src");
    QString value = e.text();

    switch (type)
    {
        case EElementType::Div:
        {
            view = addDivElement(view, parent, parentType, style, direction, alignment);
            break;
        }
        case EElementType::Input:
        {
            addInputElements(view, parent, parentType, style, inputType, value);
            break;
        }
        case EElementType::Textarea:
        {
            addTextAreaElements(view, parent, parentType, style, value);
            break;
        }

        case EElementType::Select:
        {
            addSelectElements(view, parent, parentType, e, style);
            break;
        }
        case EElementType::List:
        {
            addListElements(view, parent, parentType, e, style);
            break;
        }
        case EElementType::Table:
        {
            addTableElements(view, parent, parentType, e, style);
            break;
        }
        case EElementType::Img:
        {
            if (!src.size()) break;
            addImageElemets(view, parent, parentType, e, style, src);
            break;
        }
        case EElementType::Button:
        {
            addButtonElements(view, parent, parentType, style, value);
            break;
        }
        case EElementType::Text:
        {
            addTextElements(view, parent, parentType, style, value, headerName);
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

    download = new DownloadManager(this);
    mXmlPageDownloadManager = new DownloadManager(this);
    connect(download, &DownloadManager::finished, this, &MainWindow::onDownloadFinished);
    connect(mXmlPageDownloadManager, &DownloadManager::xmlfinished, this, &MainWindow::onXmlPageDownloadFinished);

    QWidget* centralwidget = new QWidget(this);
    QVBoxLayout* layout = new QVBoxLayout(centralwidget);

    QHBoxLayout* toolBarLayout = new QHBoxLayout(centralwidget);
    mUrlInput = new QLineEdit(centralwidget);
    toolBarLayout->addWidget(mUrlInput);
    layout->addLayout(toolBarLayout);
    QPushButton* refresh = new QPushButton(centralwidget);
    QPixmap pixmap(":/icons/refresh.png");
    QIcon ButtonIcon(pixmap);
    refresh->setIcon(ButtonIcon);
    toolBarLayout->addWidget(refresh);

    connect(mUrlInput, SIGNAL(returnPressed()), refresh, SIGNAL(clicked()));
    connect(refresh, SIGNAL(clicked()), this, SLOT(onRefresh()));

    mBrowserArea = new QScrollArea(centralwidget);
    layout->addWidget(mBrowserArea);
    mBrowserArea->setWidget(mLayout);
    mBrowserArea->setWidgetResizable(true);
    setCentralWidget(centralwidget);
}


void MainWindow::onDownloadFinished(void* usrPtr, QByteArray data)
{
    QLabel* label = static_cast<QLabel*>(usrPtr);
    QPixmap pix;
    pix.loadFromData(data);
    label->setPixmap(pix);
    label->setAlignment(Qt::AlignCenter);
    label->setScaledContents(true);
}

void MainWindow::onXmlPageDownloadFinished(void *usrPtr, QByteArray data)
{
    QDomDocument d;
    d.setContent(data);
    QDomElement root = d.firstChildElement();
    parseElement(root, nullptr, EElementType::Unknown);
    mBrowserArea->setWidget(mLayout);
}

void MainWindow::onRefresh()
{
    if (mLayout)
    {
        delete mLayout;
        mLayout = nullptr;
    }

    QString url = mUrlInput->text();
    mXmlPageDownloadManager->start(url, nullptr);
}

MainWindow::~MainWindow()
{
    delete ui;
}
