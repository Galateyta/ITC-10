#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QSize>
#include <QTableWidget>
#include <QScrollArea>

EElementType elementTypeToEnum(std::string name)
{
    if (name == "div") return  EElementType::Div;
    if (name == "input") return  EElementType::Input;
    if (name == "button") return  EElementType::Button;
    if ( (name[0] == 'h' && name.length() == 2 && name[1] >= '1' && name[1] <= '6') || name == "span" || name == "p" ) return  EElementType::Text;
    if (name == "select") return EElementType::Select;
    if (name == "table") return EElementType::Table;
    if (name == "img") return EElementType::Img;

    return EElementType::Unknown;
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
            if (parentType == EElementType::Div) {
                view = new Div();
                Div* layout = static_cast<Div*>(view);
                static_cast<Div*>(parent)->addDiv(layout);
                layout->setStyleSheet(style);

            } else {
                QScrollArea *scrollArea = new QScrollArea(ui->centralWidget);
                scrollArea->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOn);
                scrollArea->setWidgetResizable(true);

                view = new Div(static_cast<QWidget*>(parent));
                Div* div = static_cast<Div*>(view);
                scrollArea->setWidget(dynamic_cast<QWidget*>(div));
                setCentralWidget(scrollArea);
                div->setStyleSheet(style);
            }
            break;
        }
        case EElementType::Select: {
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
            break;
        }
        case EElementType::Input: {
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
            }
            break;
        }
        case EElementType::Button: {
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
            break;
        }
        case EElementType::Text: {
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
            break;
        }
        case EElementType::Table: {
            if (parentType == EElementType::Div) {
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

                for (int i = 1; i < e.childNodes().size(); ++i) {
                    const QDomNodeList& childs = e.childNodes().at(i).childNodes();
                    for (int j = 0; j < childs.size(); ++j) {
                        QTableWidgetItem* item = new QTableWidgetItem(childs.at(j).toElement().text());
                        table->setItem(i - 1, j, item);
                    }
                }

                static_cast<Div*>(parent)->addWidget(table);
            }
            break;
        }
        case EElementType::Img: {
            if (parentType == EElementType::Div) {
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

    QFile xmlFile("C:/Users/Admin/Documents/Qt projects/XMLParser/test.xml");
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
