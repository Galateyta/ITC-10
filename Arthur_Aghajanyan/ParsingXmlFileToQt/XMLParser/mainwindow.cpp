#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QScrollArea>


EElementType elementTypeToEnum(std::string name)
{
    if ("body" == name || "div" == name) return  EElementType::Div;
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
    if ("textarea" == name) return  EElementType::TextArea;
    if ("select" == name) return EElementType::Select;
    if ("table" == name) return EElementType::Table;
    if ("img" == name) return EElementType::Img;
    if ("ol" == name || "ul" == name) return EElementType::ol;
    if ("ul" == name) return EElementType::ul;

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
    QDomNamedNodeMap attributes = e.attributes();
    QString style = e.attribute("style", "");
    QString text = e.text();
    QString typeOfTag = e.attribute("type");

    switch (type)
    {
        case EElementType::Div:
            view = createDiv(view, e, parent, parentType);
            break;
        case EElementType::Input:
            createInpute(view, e, parent, parentType, typeOfTag);
            break;

        case EElementType::Button:
            createButton(view, e, parent, parentType);
           break;

        case EElementType::p:
        case EElementType::span:
            createPAndSpan(view, e, parent, parentType);
           break;

        case EElementType::h1:
        case EElementType::h2:
        case EElementType::h3:
        case EElementType::h4:
        case EElementType::h5:
        case EElementType::h6:
            createH(view, e, parent, parentType, type);
            break;

        case EElementType::TextArea:
            createTextArea(view, e, parent, parentType);
            break;

        case EElementType::Select:
            createSelect(view, e, parent, parentType);
            break;

        case EElementType::Table:
            createTable(view, e, parent, parentType);
            break;

        case EElementType::Img:
            createImg(view, e, parent, parentType);
            break;

        case EElementType::ol:
        case EElementType::ul:
            createOlAndUl(view, e, parent, parentType);
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
QObject* MainWindow::createDiv(QObject *view, QDomElement e, QObject *parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
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

void MainWindow::createInpute(QObject* view, QDomElement e, QObject* parent, EElementType parentType,QString typeOfTag)
{
    QString style = e.attribute("style", "");
    QString text = e.text();

    if(typeOfTag == "checkbox")
    {
        if (parentType == EElementType::Div)
        {
             view = new QCheckBox();
             QCheckBox* widget = static_cast<QCheckBox*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             widget->setText(text);
             widget->setStyleSheet(style);
        }
    }
    else if(typeOfTag == "radio")
    {
        if (parentType == EElementType::Div)
        {
             view = new QRadioButton();
             QRadioButton* widget = static_cast<QRadioButton*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             widget->setText(text);
             widget->setStyleSheet(style);
        }
    }
    else
    {
        if (parentType == EElementType::Div)
        {
            view = new QLineEdit();
            QLineEdit* widget = static_cast<QLineEdit*>(view);
            static_cast<Div*>(parent)->addWidget(widget);
            widget->setText(text);
            widget->setStyleSheet(style);
        }
    }
}

void MainWindow::createButton(QObject* view, QDomElement e, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    QString text = e.text();
    QString href = e.attribute("href");
    if (parentType == EElementType::Div)
    {
        view = new QPushButton();
        QPushButton* widget = static_cast<QPushButton*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
        widget->setText(text);
        widget->setStyleSheet(style);
        int width = widget->fontMetrics().width(text);
        widget->setFixedWidth(width + 30);
        if(href.size())
        {
        connect(widget, &QPushButton::clicked, this, [this,href]{changePage(href);});
        }
    }
}

void MainWindow::createH(QObject* view, QDomElement e, QObject* parent, EElementType parentType, EElementType type)
{
    QString style = e.attribute("style", "");
    QString text = e.text();
    Qt::Alignment alignment = alignmentStringToEnum(e.attribute("justify-content"));

    QLabel* widget;
    if (parentType == EElementType::Div)
    {
        view = new QLabel();
        widget = static_cast<QLabel*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
        widget->setText(text);
        widget->setStyleSheet(getHStyle(type) + ";" + style);
        widget->setWordWrap(true);
        QSize size = widget->sizeHint();
        widget->setMinimumSize(size);
        widget->setAlignment(alignment);
    }
}

void MainWindow::createPAndSpan(QObject* view, QDomElement e, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    QString text = e.text();
    QLabel* widget;
    if (parentType == EElementType::Div)
    {
        view = new QLabel();
        widget = static_cast<QLabel*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
        widget->setText(text);
        widget->setStyleSheet(style);
        widget->setWordWrap(true);
        QSize size = widget->sizeHint();
        widget->setMinimumSize(size);
    }
}

void MainWindow::createTextArea(QObject *view, QDomElement e, QObject *parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    QString text = e.text();
    if (parentType == EElementType::Div)
    {
         view = new QTextEdit();
         QTextEdit* widget = static_cast<QTextEdit*>(view);
         static_cast<Div*>(parent)->addWidget(widget);
         widget->setText(text);
         widget->setStyleSheet(style);
    }
}

void MainWindow::createSelect(QObject* view, QDomElement e, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    if (parentType == EElementType::Div)
    {
        view = new QComboBox();
        QComboBox* combobox = static_cast<QComboBox*>(view);
        combobox->setStyleSheet(style);

        for (int i = 0; i < e.childNodes().size(); ++i)
        {
            combobox->addItem(e.childNodes().at(i).toElement().text());
        }
        static_cast<Div*>(parent)->addWidget(combobox);

    }
}

void MainWindow::createTable(QObject* view, QDomElement e, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");    
    if (parentType == EElementType::Div)
    {
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
}

void MainWindow::createImg(QObject* view, QDomElement e, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");

    if (parentType == EElementType::Div)
    {
        view = new QLabel();
        QLabel* label = static_cast<QLabel*>(view);
        label->setStyleSheet(style);
        QString src = e.attribute("src", "");
        if (!src.size()) return;
        mDownloadManager->start(src,label);
        static_cast<Div*>(parent)->addWidget(label);
    }
}

void MainWindow::onDownloadFinished(void* usrPtr, QByteArray data)
{
    QLabel* label = static_cast<QLabel*>(usrPtr);
    QPixmap pixmap;
    pixmap.loadFromData(data);
    label->setPixmap(pixmap);
    label->setAlignment(Qt::AlignCenter);
}

void MainWindow::createOlAndUl(QObject* view, QDomElement e, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    if (parentType == EElementType::Div)
    {
        view = new QListWidget();
        QListWidget* list = static_cast<QListWidget*>(view);
        int count = e.childNodes().size();
        for (int i = 0; i < count; i++)
        {
            if(e.tagName() == "ul")
            {
                //QString styleUl = QChar(0x2022);
                list->addItem(e.childNodes().at(i).toElement().text());
            }
            else
            {
                QString num = (QString::number(i + 1) + ". ");
                list->addItem(num + e.childNodes().at(i).toElement().text());
             }
             list->setStyleSheet(style);
         }
         static_cast<Div*>(parent)->addWidget(list);
    }
}

QString MainWindow::getHStyle(EElementType type)
{
    switch (type)
    {
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
    }
}

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    mDownloadManager = new DownloadManager(this);
    mXmlPageDownloadManager = new DownloadManager(this);

    connect(mXmlPageDownloadManager, SIGNAL(finished(void*, QByteArray)),
            this, SLOT(onXmlPageDownloadFinished(void*, QByteArray)));

    connect(mDownloadManager, SIGNAL(finished(void*, QByteArray)),
            this, SLOT(onDownloadFinished(void*, QByteArray)));

    QWidget* centralWidget = new QWidget(this);
    QVBoxLayout* layout = new QVBoxLayout(centralWidget);
    QHBoxLayout* toolBarLayout = new QHBoxLayout(centralWidget);

    mUrlInput = new QLineEdit(centralWidget);
    toolBarLayout->addWidget(mUrlInput);
    layout->addLayout(toolBarLayout);
    mUrlInput->setStyleSheet("border-radius: 5px; border: 2px solid blue");

    QPushButton* refresh = new QPushButton(centralWidget);
    QPixmap pixmap(":/icons/refresh.png");
    QIcon ButtonIcon(pixmap);
    refresh->setIcon(ButtonIcon);
    refresh->setStyleSheet("background-color: yellow");
    connect(mUrlInput, SIGNAL(returnPressed()), refresh, SIGNAL(clicked()));
    connect(refresh, SIGNAL(clicked()), this, SLOT(onRefresh()));
    toolBarLayout->addWidget(refresh);

    mBrowserArea = new QScrollArea(centralWidget);
    layout->addWidget(mBrowserArea);
    mBrowserArea->setWidgetResizable(true);
    setCentralWidget(centralWidget);
}
void MainWindow::onXmlPageDownloadFinished(void* usrPtr, QByteArray data)
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
void MainWindow::changePage(QString href)
{
    mUrlInput->setText(href);
    emit onRefresh();
}

MainWindow::~MainWindow()
{
    delete ui;
}
