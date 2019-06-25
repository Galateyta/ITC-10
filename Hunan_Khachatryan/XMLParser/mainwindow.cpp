#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QSize>
#include <QTableWidget>
#include <QScrollArea>


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

    return EElementType::Unknown;
}

void MainWindow::parseElement(QDomElement e, QObject* parent, EElementType parentType)
{
    std::string name = e.tagName().toStdString();
    EElementType type = elementTypeToEnum(name);

    QObject* view = nullptr;

    QDomNamedNodeMap attributes = e.attributes();
    QString style = e.attribute("style");
    QString value = e.text();
    QString nv = e.nodeValue();
    QString data = e.toText().data();
    QString tagType = e.attribute("type");

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
    case EElementType::Select: {
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
        break;
    }
    case EElementType::Table: {
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
        break;
    }
    case EElementType::Img: {
        if (parentType == EElementType::Div)
        {
            view = new QLabel();
            QLabel* label = static_cast<QLabel*>(view);
            label->setStyleSheet(style);

            QString src = e.attribute("src", "");
            if (!src.size()) break;

            QPixmap img(src);
            label->setPixmap(img);
            label->setScaledContents(true);
//            QSize size = label->sizeHint();
//            label->setMinimumSize(200,200);
            label->setSizePolicy(QSizePolicy::Ignored, QSizePolicy::Ignored);

            static_cast<Div*>(parent)->addWidget(label);
        }
        break;
    }
    case EElementType::Input: {
        if (tagType == "text")
        {

            if (parentType == EElementType::Div)
            {
                 view = new QLineEdit();
                 QWidget* widget = static_cast<QWidget*>(view);
                 Div* p = static_cast<Div*>(parent);
                 p->addWidget(widget);
            }
            else
            {
                  view = new QLineEdit(static_cast<QWidget*>(parent));
            }
        } else if (tagType == "checkbox")
        {

            if (parentType == EElementType::Div)
            {
                 view = new QCheckBox();
                 QWidget* widget = static_cast<QWidget*>(view);
                 Div* p = static_cast<Div*>(parent);
                 p->addWidget(widget);
            }
            else
            {
                  view = new QCheckBox(static_cast<QWidget*>(parent));
            }
        }  else if (tagType == "radio")
        {

            if (parentType == EElementType::Div)
            {
                 view = new QRadioButton();
                 QWidget* widget = static_cast<QWidget*>(view);
                 Div* p = static_cast<Div*>(parent);
                 p->addWidget(widget);
            }
            else
            {
                  view = new QRadioButton(static_cast<QWidget*>(parent));
            }
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
    case EElementType::P: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             widget->setStyleSheet(style);
             widget->setText(value);
             widget->setWordWrap(true);

             QSize size = widget->sizeHint();
             widget->setMinimumSize(size);

        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::Span: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             widget->setStyleSheet(style);
             widget->setText(value);
             widget->setWordWrap(true);

             QSize size = widget->sizeHint();
             widget->setMinimumSize(size);

        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::TextArea: {
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
        break;
    }

    case EElementType::H1: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             style="font-size: 24pt;font-weight: bold";
             widget->setStyleSheet(style);
             widget->setText(value);
        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
              QLabel* widget = static_cast<QLabel*>(view);
              style="font-size: 24pt;font-weight: bold;color:green";

              widget->setStyleSheet(style);
              widget->setText(value);
        }
        break;
    }
    case EElementType::H2: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             style=" font-size: 18pt;font-weight: bold";
             widget->setStyleSheet(style);
             widget->setText(value);

        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::H3: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             style=" font-size: 14pt;font-weight: bold";
             widget->setStyleSheet(style);
             widget->setText(value);

        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::H4: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             style="font-size: 12pt;font-weight: bold";
             widget->setStyleSheet(style);
             widget->setText(value);

        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::H5: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             style="font-size: 10pt;font-weight: bold";
             widget->setStyleSheet(style);
             widget->setText(value);

        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::H6: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* widget = static_cast<QLabel*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             style="font-size: 9pt;font-weight: bold";
             widget->setStyleSheet(style);
             widget->setText(value);
        }
        else
        {
              view = new QLabel(static_cast<QWidget*>(parent));
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


    QFile xmlFile("/home/hunan/Desktop/test.xml");
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
