#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "downloadmanager.h"
#include <QSize>
#include <QTableWidget>
#include <QScrollArea>
#include <QListWidget>
#include <QLineEdit>

EElementType elementTypeToEnum(std::string name)
{
    if ("textarea" == name) return EElementType::TextArea;
    if ("button" == name) return EElementType::Button;
    if ("select" == name) return EElementType::Select;
    if ("input" == name) return EElementType::Input;
    if ("table" == name) return EElementType::Table;
    if ("span" == name) return EElementType::Span;
    if ("body" == name) return  EElementType::Div;
    if ("div" == name) return EElementType::Div;
    if ("img" == name) return EElementType::Img;
    if ("h1" == name) return EElementType::H1;
    if ("h2" == name) return EElementType::H2;
    if ("h3" == name) return EElementType::H3;
    if ("h4" == name) return EElementType::H4;
    if ("h5" == name) return EElementType::H5;
    if ("h6" == name) return EElementType::H6;
    if ("p" == name) return EElementType::P;
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
    QString style = e.attribute("style");
    QBoxLayout::Direction direction = directionStringToEnum(e.attribute("flex-direction"));
    QString value = e.text();
    QString nv = e.nodeValue();
    QString data = e.toText().data();
    QString tagType = e.attribute("type");
    QString placeholder = e.attribute("placeholder");
    Qt::Alignment alignment = alignmentStringToEnum(e.attribute("justify-content"));


    switch (type) {
        case EElementType::Div:
        {
            view = createDiv(parentType, parent, view, style, direction, alignment);
            break;
        }

        case EElementType::Select:
        {
            createSelect(e, view, style, parent, parentType);
            break;
        }

        case EElementType::Table:
        {
            createTable(view, style,parentType, parent, e);
            break;
        }

        case EElementType::Img:
        {
            createImg(parentType, parent, view, style, e);
            break;
        }

        case EElementType::Input:
        {
            createInput(tagType, parentType, view, style, parent, value, placeholder);
            break;
        }

        case EElementType::Button:
        {
            createButton(parentType, view, parent, style, value);
            break;
        }

        case EElementType::TextArea:
        {
            createTextArea(view, parentType, parent, style, value);
            break;
        }

        case EElementType::P:
        case EElementType::Span:
        case EElementType::H1:
        case EElementType::H2:
        case EElementType::H3:
        case EElementType::H4:
        case EElementType::H5:
        case EElementType::H6:
        {
            createText(view, e, parent, parentType, type);
            break;
        }

        case EElementType::Ol:
        case EElementType::Ul:
        {
            createList(view, e, parent, parentType);
            break;
        }

        default:
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
        parseElement(childs.at(i).toElement(), view, type);
    }

}

QObject* MainWindow::createDiv(EElementType parentType, QObject* parent, QObject* view,
     QString style, QBoxLayout::Direction direction, Qt::Alignment alignment)
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

void MainWindow::createSelect(QDomElement e, QObject* view,
     QString style, QObject* parent, EElementType parentType)
{
    if (parentType == EElementType::Div)
    {
        view = new QComboBox();
        QComboBox* combobox = static_cast<QComboBox*>(view);
        combobox->setStyleSheet(style);
        int size = e.childNodes().size();
        for (int i = 0; i < size; ++i)
        {
            combobox->addItem(e.childNodes().at(i).toElement().text());
        }
        static_cast<Div*>(parent)->addWidget(combobox);
    }
}

void MainWindow::createTable(QObject* view, QString style,
     EElementType parentType, QObject* parent, QDomElement e)
{
    if (parentType == EElementType::Div)
    {
        view = new QTableWidget();
        QTableWidget* table = static_cast<QTableWidget*>(view);
        table->setStyleSheet(style);

        QDomElement headersElem = e.firstChild().toElement();
        table->setColumnCount(headersElem.childNodes().size());
        QStringList headers;

        int size = headersElem.childNodes().size();
        for (int i = 0; i < size; ++i)
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

        Div* p = static_cast<Div*>(parent);
        p->addWidget(table);
    }
}

void MainWindow::createImg(EElementType parentType, QObject* parent,
     QObject* view, QString style, QDomElement e)
{
    if (parentType == EElementType::Div)
    {
        view = new QLabel();
        QLabel* label = static_cast<QLabel*>(view);
        label->setStyleSheet(style);

        QString src = e.attribute("src", "");
        if (src.size()) {
            mDownloadManager->start(src, label);
            static_cast<Div*>(parent)->addWidget(label);
        }
    }
}

void MainWindow::createButton(EElementType parentType,
     QObject* view, QObject* parent, QString style, QString value)
{
    if (parentType == EElementType::Div)
    {
         view = new QPushButton();
         QPushButton* widget = static_cast<QPushButton*>(view);
         static_cast<Div*>(parent)->addWidget(widget);
         widget->setStyleSheet(style);
         widget->setText(value);
         int w = widget->fontMetrics().width(value);
         widget->setFixedWidth(w + 20);
    }
    else
    {
          view = new QPushButton(static_cast<QWidget*>(parent));
    }
}

void MainWindow::createTextArea(QObject* view, EElementType parentType,
     QObject* parent, QString style, QString value)
{
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
}

void MainWindow::createInput(QString tagType, EElementType parentType,
     QObject* view, QString style, QObject* parent, QString value, QString placeholder)
{
    if (tagType == "text")
    {
        createInputText(parentType, view, style, parent, placeholder);
    }
    else if (tagType == "checkbox")
    {
        createInputCheckbox(parentType, view, value, parent);
    }
    else if (tagType == "radio")
    {
        createInputRadio(parentType, view, value, parent);
    }
}

void MainWindow::createInputText(EElementType parentType,
     QObject* view, QString style, QObject* parent, QString placeholder)
{
    if (parentType == EElementType::Div)
    {
         view = new QLineEdit();
         view->setProperty("placeholderText", placeholder);
         QWidget* widget = static_cast<QWidget*>(view);
         widget->setStyleSheet(style);
         static_cast<Div*>(parent)->addWidget(widget);
    }
    else
    {
          view = new QLineEdit(static_cast<QWidget*>(parent));
    }
}

void MainWindow::createInputRadio(EElementType parentType,
     QObject* view, QString value, QObject* parent)
{
    if (parentType == EElementType::Div)
    {
        view = new QRadioButton();
        QRadioButton* widget = static_cast<QRadioButton*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
        widget->setText(value);
        widget->setStyleSheet("color:red");
    }
    else
    {
        view = new QRadioButton(static_cast<QWidget*>(parent));
    }
}

void MainWindow::createInputCheckbox(EElementType parentType,
     QObject* view, QString value, QObject* parent)
{
    if (parentType == EElementType::Div)
    {
         view = new QCheckBox();
         QCheckBox* widget = static_cast<QCheckBox*>(view);
         static_cast<Div*>(parent)->addWidget(widget);
         widget->setText(value);
         widget->setStyleSheet("color:red");
    }
    else
    {
          view = new QCheckBox(static_cast<QWidget*>(parent));
    }
}

void MainWindow::createText(QObject* view,
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
        widget->setWordWrap(true);
        QSize size = widget->sizeHint();
        widget->setMinimumSize(size);
    }
    else
    {
        view = new QLabel(static_cast<QWidget*>(parent));
    }
}

MainWindow::MainWindow(QWidget *parent) :
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

    mUrlInput = new QLineEdit(centralWidget);
    toolBarLayout->addWidget(mUrlInput);
    layout->addLayout(toolBarLayout);

    QPushButton* refresh = new QPushButton(centralWidget);
    QPixmap pixmap(":/icons/refresh.png");
    QIcon ButtonIcon(pixmap);
    refresh->setIcon(ButtonIcon);
    connect(mUrlInput, SIGNAL(returnPressed()), refresh, SIGNAL(clicked()));
    connect(refresh, SIGNAL(clicked()), this, SLOT(onRefresh()));
    toolBarLayout->addWidget(refresh);

    mBrowserArea = new QScrollArea(centralWidget);
    layout->addWidget(mBrowserArea);
    mBrowserArea->setWidgetResizable(true);
    setCentralWidget(centralWidget);
}

void MainWindow::onDownloadFinished(void* usrPtr, QByteArray data)
{
    QLabel* label = static_cast<QLabel*>(usrPtr);
    QPixmap pix;
    pix.loadFromData(data);
    label->setPixmap(pix);
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

void MainWindow::createList(QObject* view, QDomElement e, QObject* parent,EElementType parentType)
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

MainWindow::~MainWindow()
{
    delete ui;
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
