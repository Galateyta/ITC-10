#include "downloadmanager.h"
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QTableWidget>
#include <QScrollArea>
#include <QListWidget>
#include <QSize>



EElementType elementTypeToEnum(std::string name)
{
    if ("body" == name) return  EElementType::Div;
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
        createSelect(view,e,parent,parentType);
        break;

    case EElementType::Table:
        createTable(view,e,parent,parentType);
        break;

    case EElementType::Img:
        createImage(view,e,parent,parentType);
        break;

    case EElementType::Input:
        createInput(view,e,parent,parentType);
        break;

    case EElementType::Button:
        createButton(view,e,parent,parentType);
        break;

    case EElementType::P:
    case EElementType::Span:
       createP(view,e,parent,parentType);
       break;

    case EElementType::Ul:
    case EElementType::Ol:
        createOlAndUl(view,e,parent,parentType);
        break;

    case EElementType::TextArea:
        createTextArea(view,e,parent,parentType);
        break;

    case EElementType::H1:
        createH(view,e,parent,EElementType::H1,parentType);
        break;

    case EElementType::H2:
        createH(view,e,parent,EElementType::H2,parentType);
        break;

    case EElementType::H3:
        createH(view,e,parent,EElementType::H3,parentType);
        break;

    case EElementType::H4:
        createH(view,e,parent,EElementType::H4,parentType);
        break;

    case EElementType::H5:
        createH(view,e,parent,EElementType::H5,parentType);
        break;

    case EElementType::H6:
        createH(view,e,parent,EElementType::H6,parentType);
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

MainWindow::MainWindow(QWidget* parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    mDownloadManager = new DownloadManager(this);
    mXmlPageDownloadManager = new DownloadManager(this);
    connect(mDownloadManager, SIGNAL(finished(void*, QByteArray)),
            this, SLOT(onDownloadFinished(void*, QByteArray)));

    connect(mXmlPageDownloadManager, SIGNAL(finished(void*, QByteArray)),
            this, SLOT(onXmlPageDownloadFinished(void*, QByteArray)));

    QWidget* centralWidget = new QWidget(this);
    QVBoxLayout* layout = new QVBoxLayout(centralWidget);

    QHBoxLayout* toolBarLayout = new QHBoxLayout(centralWidget);

    QPushButton* prew = new QPushButton(centralWidget);
    QPixmap pixmapPrew(":/icons/prew.png");
    QIcon prewIcon(pixmapPrew);
    prew->setIcon(prewIcon);
    connect(prew, SIGNAL(clicked()), this, SLOT(onPrew()));
    toolBarLayout->addWidget(prew);

    QPushButton* next = new QPushButton(centralWidget);
    QPixmap pixmapNext(":/icons/next.png");
    QIcon nextIcon(pixmapNext);
    next->setIcon(nextIcon);
    connect(next, SIGNAL(clicked()), this, SLOT(onNext()));
    toolBarLayout->addWidget(next);

    QPushButton* refresh = new QPushButton(centralWidget);
    QPixmap pixmap(":/icons/refresh.png");
    QIcon ButtonIcon(pixmap);
    refresh->setIcon(ButtonIcon);
    connect(mUrlInput, SIGNAL(returnPressed()), refresh, SIGNAL(clicked()));
    connect(refresh, SIGNAL(clicked()), this, SLOT(onRefresh()));
    toolBarLayout->addWidget(refresh);

    mUrlInput = new QLineEdit(centralWidget);
    toolBarLayout->addWidget(mUrlInput);
    layout->addLayout(toolBarLayout);



    mBrowserArea = new QScrollArea(centralWidget);
    layout->addWidget(mBrowserArea);
    mBrowserArea->setWidgetResizable(true);
    setCentralWidget(centralWidget);

    url = "";
    prewUrl = "";
    nextUrl = "";
}

void MainWindow::onDownloadFinished(void* usrPtr, QByteArray data)
{
    QLabel* label = static_cast<QLabel*>(usrPtr);
    QPixmap pix;
    pix.loadFromData(data);
    label->setPixmap(pix);
    label->setAlignment(Qt::AlignCenter);
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

    if (url != mUrlInput->text())
    {
        prewUrl = url;
        nextUrl = "";
    }

    url = mUrlInput->text();
    mXmlPageDownloadManager->start(url, nullptr);

}

void MainWindow::onPrew()
{
    if (prewUrl != "")
    {
        if (mLayout)
        {
            delete mLayout;
            mLayout = nullptr;
        }
        nextUrl = url;
        url = prewUrl;
        mXmlPageDownloadManager->start(url, nullptr);
        mUrlInput->setText(url);
        prewUrl = "";
    }
}

void MainWindow::onNext()
{
    if (nextUrl != "")
    {
        if (mLayout)
        {
            delete mLayout;
            mLayout = nullptr;
        }
        prewUrl = url;
        url = nextUrl;
        mXmlPageDownloadManager->start(url, nullptr);
        mUrlInput->setText(url);
        nextUrl = "";
    }
}

void MainWindow::createButton(QObject* view, QDomElement e, QObject* parent,EElementType parentType)
{
     QString style = e.attribute("style");
     QString value = e.text();
     if(parentType == EElementType::Div)
     {
         view = new QPushButton();
         QPushButton* widget = static_cast<QPushButton*>(view);
         static_cast<Div*>(parent)->addWidget(widget);

         widget->setStyleSheet(style);
         widget->setText(value);
         int w = widget->fontMetrics().width(value);
         widget->setFixedWidth(w + 20);
     }

}

void MainWindow::createInput(QObject* view, QDomElement e, QObject* parent,EElementType parentType)
{
    QString style = e.attribute("style");
    QString tagType = e.attribute("type");
    QString value = e.text();

    if(parentType == EElementType::Div)
    {
         if (tagType == "checkbox")
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
         } else
         {
              view = new QLineEdit();
              QLineEdit* widget = static_cast<QLineEdit*>(view);
              Div* p = static_cast<Div*>(parent);
              p->addWidget(widget);
              widget->setStyleSheet(style);

         }
    }
}

void MainWindow::createSelect(QObject* view, QDomElement e, QObject *parent,EElementType parentType)
{
    QString style = e.attribute("style");
    if(parentType == EElementType::Div)
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

void MainWindow::createP(QObject* view, QDomElement e, QObject *parent,EElementType parentType)
{
    QString style = e.attribute("style");
    QString value = e.text();
    if(parentType == EElementType::Div)
    {
        view = new QLabel();
        QLabel* widget = static_cast<QLabel*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
        widget->setStyleSheet(style);
        widget->setWordWrap(true);
        widget->setText(value);

        QSize size = widget->sizeHint();
        widget->setMinimumSize(size);
    }
}

void MainWindow::createImage(QObject* view, QDomElement e, QObject *parent,EElementType parentType)
{
    QString style = e.attribute("style");
    QString src = e.attribute("src");

    if(parentType == EElementType::Div)
    {
        view = new QLabel();
        QLabel* label = static_cast<QLabel*>(view);
        label->setStyleSheet(style);        
        QString regexp = "(http(s)?://)([\w-]+\.)+[\w-]+(/[\w- ;,./?%&=]*)?";
        QRegExp rx(regexp);
        rx.indexIn(src);

        if(rx.cap(0).length() != 0)
        {
            mDownloadManager->start(src, label);
        }
        else
        {
            QPixmap pix(src);
            label->setPixmap(pix.scaled(label->width(),label->height(),Qt::KeepAspectRatio));
        }

        static_cast<Div*>(parent)->addWidget(label);
    }
}

void MainWindow::createTable(QObject* view, QDomElement e, QObject *parent,EElementType parentType)
{
    QString style = e.attribute("style");
    if(parentType == EElementType::Div)
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

void MainWindow::createH(QObject* view, QDomElement e, QObject *parent,EElementType type,EElementType parentType)
{
    if(parentType == EElementType::Div)
    {
    switch (type) {
    case EElementType::H1: {
         QString style = "font-size: 24pt;font-weight: bold";
         addText(view,e,parent,style,parentType);
         break;
    }
    case EElementType::H2: {
         QString style = "font-size: 18pt;font-weight: bold";
         addText(view,e,parent,style,parentType);
         break;
        }
    case EElementType::H3: {
         QString style = "font-size: 14pt;font-weight: bold";
         addText(view,e,parent,style,parentType);
         break;
        }
    case EElementType::H4: {
         QString style = "font-size: 12pt;font-weight: bold";
         addText(view,e,parent,style,parentType);
         break;
        }
    case EElementType::H5: {
         QString style = "font-size: 10pt;font-weight: bold";
         addText(view,e,parent,style,parentType);
         break;    Qt::Alignment alignment = alignmentStringToEnum(e.attribute("justify-content"));

        }
    case EElementType::H6: {
         QString style = "font-size: 9pt;font-weight: bold";
         addText(view,e,parent,style,parentType);
         break;
        }
     }

    }
}

void MainWindow::addText(QObject* view, QDomElement e, QObject *parent, QString style,EElementType parentType)
{
    QString value = e.text();
    if(parentType == EElementType::Div)
    {
        view = new QLabel();
        QLabel* widget = static_cast<QLabel*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
        widget->setStyleSheet(style);
        widget->setText(value);
    }
}

void MainWindow::createTextArea(QObject* view, QDomElement e, QObject *parent,EElementType parentType)
{
    QString style = e.attribute("style");
    QString value = e.text();
    if(parentType == EElementType::Div)
    {
        view = new QTextEdit();
        QTextEdit* widget = static_cast<QTextEdit*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
        widget->setStyleSheet(style);
        widget->setText(value);
    }
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

void MainWindow::createOlAndUl(QObject* view, QDomElement e, QObject* parent,EElementType parentType)
{
    QString style = e.attribute("style");
    if(parentType == EElementType::Div)
    {
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

}


MainWindow::~MainWindow()
{
    delete ui;
}

