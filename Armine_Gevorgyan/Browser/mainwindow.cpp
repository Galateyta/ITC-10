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
    if("p" == name) return  EElementType::P;
    if("h1" == name || "h2" == name
            || "h3" == name || "h4" == name
            || "h5" == name || "h6" == name) return  EElementType::H;
    if ("span" == name) return  EElementType::Span;
    if ("textarea" == name) return  EElementType::TextArea;
    if ("select" == name) return EElementType::Select;
    if ("table" == name) return EElementType::Table;
    if ("img" == name) return EElementType::Img;
    if ("ul" == name || "ol" == name) return EElementType::List;

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

QObject* MainWindow::createDiv(QDomElement e, QObject* view, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    Qt::Alignment alignment = alignmentStringToEnum(e.attribute("justify-content"));
    QBoxLayout::Direction direction = directionStringToEnum(e.attribute("flex-direction"));
    if (parentType == EElementType::Div)
    {
         view = new Div();
         Div* layout = static_cast<Div*>(view);
         layout->setDirection(direction);
         layout->setStyleSheet(style);
         layout->setAlignment(alignment);
         static_cast<Div*>(parent)->addDiv(layout);
    }
    else
    {
          view = new Div(static_cast<QWidget*>(parent));
          Div* div = static_cast<Div*>(view);
          div->setStyleSheet(style);
          div->setDirection(direction);
          div->setAlignment(alignment);
          div->setStyleSheet(style);
    }

    return view;
}

void MainWindow::createInput(QDomElement e, QObject* view, QObject* parent, EElementType parentType )
{
    QString style = e.attribute("style", "");
    QString tagType = e.attribute("type");
    QString text =  e.text();
    if (tagType == "checkbox") {
        if (parentType == EElementType::Div)
        {
             view = new QCheckBox();
             QCheckBox* checkBox = static_cast<QCheckBox*>(view);
             Div* p = static_cast<Div*>(parent);
             checkBox->setText(text);
             checkBox->setStyleSheet(style);
             p->addWidget(checkBox);
        }
        else
        {
              view = new QCheckBox(static_cast<QWidget*>(parent));
        }

    } else if (tagType == "radio")
    {
        if (parentType == EElementType::Div)
        {
             view = new QRadioButton();
             QRadioButton* radioButton = static_cast<QRadioButton*>(view);
             Div* p = static_cast<Div*>(parent);
             radioButton->setText(text);
             radioButton->setStyleSheet(style);
             p->addWidget(radioButton);

        } else {
              view = new QRadioButton(static_cast<QWidget*>(parent));
        }

    } else
    {
        if (parentType == EElementType::Div) {
             view = new QLineEdit();
             QWidget* input = static_cast<QWidget*>(view);
             Div* p = static_cast<Div*>(parent);
             input->setStyleSheet(style);
             p->addWidget(input);
        } else
        {
                  view = new QLineEdit(static_cast<QWidget*>(parent));
        }
    }
}

void MainWindow::createTextArea(QDomElement e, QObject* view, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    QString text =  e.text();
    if (parentType == EElementType::Div)
    {
         view = new QTextEdit();
         QTextEdit* textArea = static_cast<QTextEdit*>(view);
         Div* p = static_cast<Div*>(parent);
         textArea->setStyleSheet(style);
         textArea->setText(text);
         p->addWidget(textArea);
    }
    else
    {
          view = new QTextEdit(static_cast<QWidget*>(parent));
    }

}

void MainWindow::createSpan(QDomElement e, QObject* view, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    QString text =  e.text();
    if (parentType == EElementType::Div)
    {
         view = new QLabel();
         QLabel* span = static_cast<QLabel*>(view);
         static_cast<Div*>(parent)->addWidget(span);
         span->setStyleSheet(style);
         span->setText(text);
         span->setWordWrap(true);
         QSize size = span->sizeHint();
         span->setMinimumSize(size);

    }
    else
    {
          view = new QLabel(static_cast<QWidget*>(parent));
    }
}

void MainWindow::createParagraph(QDomElement e, QObject* view, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    QString text =  e.text();
    if (parentType == EElementType::Div)
    {
         view = new QLabel();
         QLabel* paragraph = static_cast<QLabel*>(view);
         Div* p = static_cast<Div*>(parent);
         paragraph->setText(text);
         paragraph->setWordWrap(true);
         paragraph->setStyleSheet(style);
         p->addWidget(paragraph);
    }
    else
    {
          view = new QLineEdit(static_cast<QWidget*>(parent));
    }
}

void MainWindow::createHeader(QDomElement e, QObject* view, QObject* parent, EElementType parentType)
{
    std::string name = e.tagName().toStdString();
    QString style = e.attribute("style", "");
    QString style1 ;
    QString text =  e.text();
    if (parentType == EElementType::Div)
    {
         view = new QLabel();
         QLabel* header = static_cast<QLabel*>(view);
         Div* p = static_cast<Div*>(parent);
         QString text =  e.text();
         header->setWordWrap(true);
         header->setText(text);

         if(name == "h1") {
             style = style + ";font-size:27px;font-weight: bold";
         } else if (name == "h2") {
             style = style + ";font-size:26px;font-weight: bold";
         }
         else if (name == "h3") {
             style = style + ";font-size:23px;font-weight: bold";
         }
         else if (name == "h4") {
             style = style + ";font-size:20px;font-weight: bold";
         }
         else if (name == "h5") {
             style = style + ";font-size:17px;font-weight: bold";
         }
         else if (name == "h6") {
             style = style + ";font-size:14px;font-weight: bold";
         }

        QHBoxLayout* m_lay = new QHBoxLayout();
        m_lay->addWidget(header);
        header->setStyleSheet(style);
        p->addLayout(m_lay);
    }
    else
    {
          view = new QLineEdit(static_cast<QWidget*>(parent));
    }


}

void MainWindow::createSelect(QDomElement e, QObject* view, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    if (parentType == EElementType::Div)
    {
        view = new QComboBox();
        QComboBox* combobox = static_cast<QComboBox*>(view);
        QHBoxLayout* m_label = new QHBoxLayout();
        Div* p =  static_cast<Div*>(parent);
        combobox->setStyleSheet(style);

        for (int i = 0; i < e.childNodes().size(); ++i)
        {
            combobox->addItem(e.childNodes().at(i).toElement().text());
        }

        m_label->addWidget(combobox);
        p->addLayout(m_label);

    }
}

void MainWindow::createButton(QDomElement e, QObject* view, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    QString text =  e.text();
    if (parentType == EElementType::Div)
    {
         view = new QPushButton();
         QPushButton* button = static_cast<QPushButton*>(view);
         Div* p = static_cast<Div*>(parent);
         button->setStyleSheet(style);
         button->setText(text);
         int length = button->fontMetrics().QFontMetrics::horizontalAdvance(text);
         button->setFixedWidth(length + 20);
         p->addWidget(button);

    }
    else
    {
          view = new QPushButton(static_cast<QWidget*>(parent));
    }

}

void MainWindow::createList(QDomElement e, QObject* view, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    std::string name = e.tagName().toStdString();
    if(name == "ul")
    {
        QString styleUl = QChar(0x2022);
        if (parentType == EElementType::Div)
        {
            view = new QListWidget();
            QListWidget* list = static_cast<QListWidget*>(view);
            QHBoxLayout* m_lay = new QHBoxLayout();
            Div* p = static_cast<Div*>(parent);
            list->setStyleSheet(style);

            for (int i = 0; i < e.childNodes().size(); ++i)
            {
                const QDomNodeList& childs = e.childNodes();
                QString text = styleUl + childs.at(i).toElement().text();
                QListWidgetItem* item = new QListWidgetItem(text);
                list->addItem(item);

            }

            m_lay->addWidget(list);
            p->addLayout(m_lay );

        }

    } else
    {
        if (parentType == EElementType::Div)
        {
            view = new QListWidget();
            QListWidget* list = static_cast<QListWidget*>(view);
            QHBoxLayout* m_lay = new QHBoxLayout();
            Div* p = static_cast<Div*>(parent);
            list->setStyleSheet(style);

            for (int i = 0; i < e.childNodes().size(); ++i)
            {
                const QDomNodeList& childs = e.childNodes();
                QString text = QString::number(i+1)+ "." + childs.at(i).toElement().text();
                QListWidgetItem* item = new QListWidgetItem(text);
                list->addItem(item);

            }

            m_lay->addWidget(list);
            p->addLayout(m_lay );

        }

    }

}

void MainWindow::createTable(QDomElement e, QObject* view, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style", "");
    QString text =  e.text();
    if (parentType == EElementType::Div)
    {
        view = new QTableWidget();
        QStringList headers;
        QTableWidget* table = static_cast<QTableWidget*>(view);
        Div* p = static_cast<Div*>(parent);
        QHBoxLayout* m_lay = new QHBoxLayout();
        QDomElement headersElem = e.firstChild().toElement();
        table->setColumnCount(headersElem.childNodes().size());

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

        table->setStyleSheet(style);
        m_lay->addWidget(table);
        p->addLayout(m_lay );
    }

}

void MainWindow::createImage(QDomElement e, QObject* view, QObject* parent, EElementType parentType)
{
    QString style = e.attribute("style");
    QString setScaledContent = e.attribute("setScaledContent");
    QString src = e.attribute("src");

    if (parentType == EElementType::Div)
        {
            view = new QLabel();
            QLabel* label = static_cast<QLabel*>(view);
            label->setStyleSheet(style);
            QString src = e.attribute("src", "");
            if (!src.size()) return;
            mDownloadManager->start(src,label);
            if(setScaledContent == "true") {
                qDebug()<<"aaaaa";
                label->setScaledContents(true);
            }

            static_cast<Div*>(parent)->addWidget(label);
        }
}


void MainWindow::parseElement(QDomElement e, QObject* parent, EElementType parentType)
{
    std::string name = e.tagName().toStdString();
    EElementType type = elementTypeToEnum(name);
    QDomNamedNodeMap attributes = e.attributes();
    QString style = e.attribute("style", "");
    QString eType = e.attribute("type");
    QObject* view = nullptr;

    switch (type)
    {
    case EElementType::Div: {
      view = createDiv(e,view, parent,  parentType);
        break;
    }
    case EElementType::Select: {
        createSelect(e,view, parent,  parentType);
        break;
       }
    case EElementType::Input: {
        createInput(e,view, parent,  parentType);
        break;

    }
    case EElementType::TextArea: {
        createTextArea(e,view, parent,  parentType);
        break;
    }
    case EElementType::Span: {
        createSpan(e,view, parent,  parentType);
        break;
    }
    case EElementType::Button: {
        createButton(e,view, parent,  parentType);
        break;
    }
    case EElementType::P: {
        createParagraph(e,view, parent, parentType);
        break;
    }
    case EElementType::H: {
        createHeader(e,view, parent,  parentType);

        break;
    }
    case EElementType::Table: {
        createTable(e,view, parent,  parentType);

            break;
        }
    case EElementType::Img: {
        createImage(e,view, parent, parentType);

            break;
        }
    case EElementType::List: {
        createList(e,view, parent,  parentType);
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

    QHBoxLayout* toolBarLayout = new QHBoxLayout();

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
    pix.height();
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

    QString url = mUrlInput->text();
    mXmlPageDownloadManager->start(url, nullptr);
}



MainWindow::~MainWindow()
{
    delete ui;
}

