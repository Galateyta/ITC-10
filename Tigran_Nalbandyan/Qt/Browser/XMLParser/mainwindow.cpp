#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QSize>
#include <QTableWidget>
#include <QScrollArea>
#include <QListWidget>

EElementType elementTypeToEnum(std::string name)
{
    if (name == "div" || name == "body") return  EElementType::Div;
    if (name == "input") return  EElementType::Input;
    if (name == "button") return  EElementType::Button;
    if ( (name[0] == 'h' && name.length() == 2 && name[1] >= '1' && name[1] <= '6') || name == "span" || name == "p" ) return  EElementType::Text;
    if (name == "select") return EElementType::Select;
    if (name == "table") return EElementType::Table;
    if (name == "img") return EElementType::Img;
    if (name == "ol" || name == "ul") return EElementType::List;

    return EElementType::Unknown;
}


QBoxLayout::Direction directionStringToEnum(QString direction) {
    if (direction == "column") return QBoxLayout::Direction::TopToBottom;
    if (direction == "row") return QBoxLayout::Direction::LeftToRight;

    return QBoxLayout::Direction::TopToBottom;
}

Qt::Alignment alignmentStringToEnum(QString alignment) {
    if (alignment == "left" || alignment == "start") return Qt::AlignLeft;
    if (alignment == "right" || alignment == "end") return Qt::AlignRight;
    if (alignment == "center") return Qt::AlignHCenter;

    return Qt::AlignHCenter;

}

void MainWindow::onDownloadFinished(void* usrPtr, QByteArray data) {
    QLabel* label = static_cast<QLabel*>(usrPtr);
    QPixmap pix;
    pix.loadFromData(data);
    label->setPixmap(pix);
    label->setAlignment(Qt::AlignHCenter);
}


void MainWindow::onXmlPageDownloadFinished(void *usrPtr, QByteArray data)
{
    QDomDocument d;
    d.setContent(data);

    QDomElement root = d.firstChildElement();
    parseElement(root, nullptr, EElementType::Unknown);
    mBrowserArea->setWidget(mLayout);
}

void MainWindow::onRefresh() {
    if (mLayout) {
        delete mLayout;
        mLayout = nullptr;
    }

    QString url = mUrlInput->text();
    mXmlDownloadManager->start(url, nullptr);
}

void MainWindow::changePage(QString href) {
    mUrlInput->setText(href);
    emit onRefresh();
}

QObject* MainWindow::createDiv(QObject *view, QDomElement e, QObject *parent, EElementType parentType) {
    Div* div;
    QString style = e.attribute("style");
    QBoxLayout::Direction direction = directionStringToEnum(e.attribute("flex-direction"));
    Qt::Alignment alignment = alignmentStringToEnum(e.attribute("justify-content"));

    if (parentType == EElementType::Div) {
        view = new Div();
        div = static_cast<Div*>(view);
        static_cast<Div*>(parent)->addDiv(div);

    } else {
        view = new Div(static_cast<QWidget*>(parent));
        div = static_cast<Div*>(view);
    }
    div->setStyleSheet(style);
    div->setDirection(direction);
    div->setAlignment(alignment);

    return div;
}

void MainWindow::createInput(QObject *view, QDomElement e, QObject *parent, EElementType parentType) {
    QString tagType = e.attribute("type");
    QString value = e.attribute("value");
    QString style = e.attribute("style");

    if (tagType == "checkbox") {
        QCheckBox* widget;
        if (parentType == EElementType::Div) {
            view = new QCheckBox();
            widget = static_cast<QCheckBox*>(view);
            Div* p = static_cast<Div*>(parent);
            p->addWidget(widget);
        } else {
            widget = new QCheckBox(static_cast<QWidget*>(parent));
        }
        widget->setStyleSheet(style);
    } else if (tagType == "radio") {
        QRadioButton* widget;
        if (parentType == EElementType::Div) {
            view = new QRadioButton();
            widget = static_cast<QRadioButton*>(view);
            Div* p = static_cast<Div*>(parent);
            p->addWidget(widget);
        } else {
            widget = new QRadioButton(static_cast<QWidget*>(parent));
        }
        widget->setStyleSheet(style);
    } else {
        QLineEdit* widget;
        if (parentType == EElementType::Div) {
            view = new QLineEdit();
            widget = static_cast<QLineEdit*>(view);
            Div* p = static_cast<Div*>(parent);
            p->addWidget(widget);
        } else {
            widget = new QLineEdit(static_cast<QWidget*>(parent));
        }
        widget->setText(value);
        widget->setStyleSheet(style);
    }
}

void MainWindow::createButton(QObject *view, QDomElement e, QObject *parent, EElementType parentType) {
    QString style = e.attribute("style");
    QString text = e.text();
    QString href = e.attribute("href", "");

    QPushButton* widget;
    if (parentType == EElementType::Div) {
        view = new QPushButton();
        widget = static_cast<QPushButton*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
    } else {
        widget = new QPushButton(static_cast<QWidget*>(parent));
    }
    widget->setStyleSheet(style);
    widget->setText(text);
    if (href.size()) {
        connect(widget, &QPushButton::clicked, this, [this, href]{changePage(href);});
    }
}

void MainWindow::createText(QObject *view, QDomElement e, QObject *parent, EElementType parentType) {
    std::string name = e.tagName().toStdString();
    QString style = e.attribute("style");
    QString text = e.text();

    QLabel* widget;
    double fontSize = 0;
    if (name[0] == 'h') {
        fontSize = double(name[1] - '0');
        fontSize = 32 / pow(1.2, fontSize);
    }
    if (parentType == EElementType::Div) {
        view = new QLabel();
        widget = static_cast<QLabel*>(view);
        static_cast<Div*>(parent)->addWidget(widget);
    } else {
        widget = new QLabel(static_cast<QWidget*>(parent));
    }
    widget->setStyleSheet(style);
    widget->setText(text);
    if (fontSize > 0) {
        widget->setFont(QFont( "Arial", int(fontSize), QFont::Bold));
    }
}

void MainWindow::createSelect(QObject *view, QDomElement e, QObject *parent, EElementType parentType) {
    QString style = e.attribute("style");
    QString value = e.attribute("value");

    QComboBox* comboBox;
    if (parentType == EElementType::Div) {
        view = new QComboBox();
        comboBox = static_cast<QComboBox*>(view);
        for (int i = 0; i < e.childNodes().size(); ++i) {
            comboBox->addItem(e.childNodes().at(i).toElement().text());
        }
        static_cast<Div*>(parent)->addWidget(comboBox);
    } else {
        comboBox = new QComboBox(static_cast<QWidget*>(parent));
    }
    comboBox->setStyleSheet(style);
    comboBox->setCurrentText(value);
}

void MainWindow::createTable(QObject *view, QDomElement e, QObject *parent, EElementType parentType) {
    QString style = e.attribute("style");

    if (parentType == EElementType::Div) {
        view = new QTableWidget();
        QTableWidget* table = static_cast<QTableWidget*>(view);
        table->setStyleSheet(style);

        QDomElement headersElem = e.firstChild().toElement();
        table->setColumnCount(headersElem.childNodes().size());
        QStringList headers;
        for (int i = 0; i < headersElem.childNodes().size(); ++i) {
            headers.push_back(headersElem.childNodes().at(i).toElement().text());
        }

        table->setRowCount(e.childNodes().size() - 1);
        table->setHorizontalHeaderLabels(headers);

        for (int i = 1; i < e.childNodes().size(); ++i) {
            const QDomNodeList& childs = e.childNodes().at(i).childNodes();
            for (int j = 0; j < childs.size(); ++j) {
                QTableWidgetItem* item = new QTableWidgetItem(childs.at(j).toElement().text());
                table->setItem(i - 1, j, item);
            }
        }

        static_cast<Div*>(parent)->addWidget(table);
    }
}

void MainWindow::createImg(QObject *view, QDomElement e, QObject *parent, EElementType parentType) {
    QString style = e.attribute("style");
    QString src = e.attribute("src");

    if(parentType == EElementType::Div) {
        view = new QLabel();
        QLabel* label = static_cast<QLabel*>(view);
        label->setStyleSheet(style);
        QString regexp = "(http(s)?://)([\w-]+\.)+[\w-]+(/[\w- ;,./?%&=]*)?";
        QRegExp rx(regexp);
        rx.indexIn(src);

        if(rx.cap(0).length() != 0) {
            mDownloadManager->startImage(src, label);
        }
        else {
            QPixmap pix(src);
            label->setPixmap(pix.scaled(label->width(),label->height(),Qt::KeepAspectRatio));
        }

        static_cast<Div*>(parent)->addWidget(label);
    }
}

void MainWindow::createList(QObject *view, QDomElement e, QObject *parent, EElementType parentType) {
    QString style = e.attribute("style");

    if (parentType == EElementType::Div) {
        view = new QListWidget();
        QListWidget* list = static_cast<QListWidget*>(view);
        int count = e.childNodes().size();
        for (int i = 0; i < count; i++) {
            if(e.tagName() == "ul") {
                QString styleUl = QChar(0x2022);
                styleUl += " ";
                list->addItem(styleUl + e.childNodes().at(i).toElement().text());
            } else {
                QString num = (QString::number(i + 1) + ". ");
                list->addItem(num + e.childNodes().at(i).toElement().text());
            }
            list->setStyleSheet(style);
         }
         static_cast<Div*>(parent)->addWidget(list);
    }
}


void MainWindow::parseElement(QDomElement e, QObject* parent, EElementType parentType)
{
    std::string name = e.tagName().toStdString();
    EElementType type = elementTypeToEnum(name);

    QObject* view = nullptr;

    QDomNamedNodeMap attributes = e.attributes();
    QString style = e.attribute("style");
    QString text = e.text();
    QString value = e.attribute("value");
    QString tagType = e.attribute("type");

    switch (type) {
        case EElementType::Div: {
            view = createDiv(view, e, parent, parentType);
            break;
        }
        case EElementType::Select: {
            createSelect(view, e, parent, parentType);
            break;
        }
        case EElementType::Input: {
            createInput(view, e, parent, parentType);
            break;
        }
        case EElementType::Button: {
            createButton(view, e, parent, parentType);
            break;
        }
        case EElementType::Text: {
            createText(view, e, parent, parentType);
            break;
        }
        case EElementType::Table: {
            createTable(view, e, parent, parentType);
            break;
        }
        case EElementType::Img: {
            createImg(view, e, parent, parentType);
            break;
        }
        case EElementType::List: {
            createList(view, e, parent, parentType);
            break;
        }
        default: {
            view = createDiv(view, e, parent, parentType);
        }
    }

    if (!mLayout) {
        mLayout = static_cast<Div*>(view);
    }

    QDomNodeList childs = e.childNodes();
    for (int i = 0; i < childs.length(); ++i) {
        parseElement(childs.at(i).toElement(), view, type);
    }
}

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow) {
    ui->setupUi(this);

    mDownloadManager = new DownloadManager(this);
    mXmlDownloadManager = new DownloadManager(this);
    connect(mDownloadManager, SIGNAL(finished(void*, QByteArray)),
            this, SLOT(onDownloadFinished(void*, QByteArray)));

    connect(mXmlDownloadManager, SIGNAL(xmlFinished(void*, QByteArray)),
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

MainWindow::~MainWindow()
{
    delete ui;
}
