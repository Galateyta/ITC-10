#include "mainwindow.h"
#include "ui_mainwindow.h"


EElementType elementTypeToEnum(std::string name)
{
    if (name == "div") return  EElementType::Div;
    if (name == "input") return  EElementType::Input;
    if (name == "button") return  EElementType::Button;
    if ( name == "h1" || name == "h2" || name == "h3" || name == "h4" || name == "h5" || name == "h6" || name == "span" || name == "p" ) return  EElementType::Text;

    return EElementType::Unknown;
}

void MainWindow::parseElement(QDomElement e, QObject* parent, EElementType parentType)
{
   // qDebug() << e.tagName();
    std::string name = e.tagName().toStdString();
    EElementType type = elementTypeToEnum(name);

    QObject* view = nullptr;

    QDomNamedNodeMap attributes = e.attributes();
    QString style = e.attribute("style");
    QString text = e.text();
    QString value = e.attribute("value");
    for (int i = 0; i < attributes.size(); ++i)
    {
        qDebug() << attributes.item(i).nodeValue();
    }

    switch (type) {
        case EElementType::Div: {
            if (parentType == EElementType::Div) {
                view = new Div();
                Div* layout = static_cast<Div*>(view);
                static_cast<Div*>(parent)->addDiv(layout);
            } else {
                view = new Div(static_cast<QWidget*>(parent));
                Div* div = static_cast<Div*>(view);
                div->setStyleSheet(style);
            }
            break;
        }
        case EElementType::Input: {
            if (parentType == EElementType::Div) {
                view = new QLineEdit();
                QLineEdit* widget = static_cast<QLineEdit*>(view);
                Div* p = static_cast<Div*>(parent);
                widget->setText(value);
                p->addWidget(widget);
            } else {
                view = new QLineEdit(static_cast<QWidget*>(parent));
            }
            break;
        }
        case EElementType::Button: {
            if (parentType == EElementType::Div) {
                view = new QPushButton();
                QPushButton* widget = static_cast<QPushButton*>(view);
                static_cast<Div*>(parent)->addWidget(widget);
                widget->setStyleSheet(style);
                widget->setText(text);
            } else {
                view = new QPushButton(static_cast<QWidget*>(parent));
            }
            break;
        }
        case EElementType::Text: {
            if (parentType == EElementType::Div) {
                view = new QLabel();
                QLabel* widget = static_cast<QLabel*>(view);
                static_cast<Div*>(parent)->addWidget(widget);
                widget->setStyleSheet(style);
                widget->setText(text);
            } else {
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
