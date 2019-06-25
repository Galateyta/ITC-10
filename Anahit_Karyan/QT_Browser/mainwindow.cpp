#include "mainwindow.h"
#include "ui_mainwindow.h"




EElementType elementTypeToEnum(std::string name)
{
    if ("div" == name) return  EElementType::Div;
    if ("input" == name) return  EElementType::Input;
    if ("button" == name) return  EElementType::Button;
    if ("select" == name) return  EElementType::Select;
    if ("table" == name) return  EElementType::Table;
    if ("img" == name) return  EElementType::Img;
    if ("p" == name || "span" == name || "h1" == name ||
        "h2" == name || "h3" == name || "h4" == name ||
        "h5" == name || "h6" == name ) return  EElementType::Text;
    return EElementType::Unknown;
}

void MainWindow::parseElement(QDomElement e, QObject* parent, EElementType parentType)
{
   // qDebug() << e.tagName();
    std::string name = e.tagName().toStdString();
    QString  text = e.text();
    qDebug() << text;
    EElementType type = elementTypeToEnum(name);
    QObject* view = nullptr;
    QDomNamedNodeMap attributes = e.attributes();
    QString style = e.attribute("style", "");
    for (int i = 0; i < attributes.size(); ++i)
    {
        qDebug() << attributes.item(i).nodeValue();
    }
    switch (type)
    {
    case EElementType::Div: {
        if (parentType == EElementType::Div)
        {
             view = new Div();
             Div* layout = static_cast<Div*>(view);
             static_cast<Div*>(parent)->addDiv(layout);
        }
        else
        {
              view = new Div(static_cast<QWidget*>(parent));
              Div* div = static_cast<Div*>(view);
              div->setStyleSheet(style);
        }
        break;
    }
    case EElementType::Text: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel(text);
             QLabel* widget = static_cast<QLabel*>(view);
             widget->setWordWrap(true);
             if("h1" == name || "h2" == name || "h3" == name || "h4" == name || "h5" == name ||"h6" == name){
                 QFont font = widget->font();
                 font.setBold(true);

                 if("h1" == name) {
                    font.setPointSize(70);
                 } else if("h2" == name) {
                     font.setPointSize(60);
                 } else if("h3" == name) {
                     font.setPointSize(50);
                 } else if("h4" == name) {
                     font.setPointSize(40);
                 } else if("h5" == name) {
                     font.setPointSize(30);
                 } else if("h6" == name) {
                    font.setPointSize(20);
                 }
                 widget->setFont(font);
                 widget->setStyleSheet(style);
             }
             Div* p = static_cast<Div*>(parent);
             p->addWidget(widget);
        }
        else
        {
            if("p" == name || "span" == name) {
                view = new QLabel(text, static_cast<QWidget*>(parent));
            } else  if("h1" == name || "h2" == name || "h3" == name || "h4" == name || "h5" == name || "h6" == name){
                view = new QLabel(text);
               // view->setWordWrap(true);
                QLabel* widget = static_cast<QLabel*>(view);
                widget->setWordWrap(true);
                QFont font = widget->font();
                if("h1" == name) {
                   font.setPointSize(70);
                } else if("h2" == name) {
                    font.setPointSize(60);
                } else if("h3" == name) {
                    font.setPointSize(50);
                } else if("h4" == name) {
                    font.setPointSize(40);
                } else if("h5" == name) {
                    font.setPointSize(30);
                } else if("h6" == name) {
                   font.setPointSize(20);
                }
                font.setBold(true);
                widget->setFont(font);
                widget->setStyleSheet(style);
                QWidget* p = static_cast<QWidget*>(parent);
                widget->setParent(p);
            }
        }
        break;
    }

    case EElementType::Select: {
        if (parentType == EElementType::Div)
        {
             view = new QComboBox();
             QComboBox* combobox= static_cast<QComboBox*>(view);
             combobox->setStyleSheet(style);
             for(int i = 0; i < e.childNodes().length(); ++i)
             {
                 combobox->addItem(e.childNodes().at(i).toElement().text());
             }
             Div* p = static_cast<Div*>(parent);
             p->addWidget(combobox);
        }

        break;
    }
    case EElementType::Table: {
        if (parentType == EElementType::Div)
        {
             view = new QTableWidget();
             QTableWidget* table= static_cast<QTableWidget*>(view);
             table->setStyleSheet(style);

             QDomElement headersElem =  e.firstChild().toElement();
             table->setColumnCount(headersElem.childNodes().size());


             QStringList headers;

             for(int i = 0; i < headersElem.childNodes().size(); ++i)
             {
                headers.push_back(headersElem.childNodes().at(i).toElement().text());
             }
//             headers.push_back("h1");
//             headers.push_back("h1222");
//             headers.push_back("h1333");
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
             Div* p = static_cast<Div*>(parent);
             p->addWidget(table);
        }
        break;
    }
    case EElementType::Img: {
        if (parentType == EElementType::Div)
        {
             view = new QLabel();
             QLabel* label= static_cast<QLabel*>(view);
             label->setStyleSheet(style);
             QString src = e.attribute("src","");
             if(!src.size()) break;
             QPixmap img(src);
             label->setPixmap(img);
             label->setScaledContents(true);
             label->setSizePolicy(QSizePolicy::Ignored, QSizePolicy::Ignored);
             Div* p = static_cast<Div*>(parent);
             p->addWidget(label);
        }
        break;
    }
    case EElementType::Input: {
        if (parentType == EElementType::Div)
        {
             view = new QLineEdit(text);
             QWidget* widget = static_cast<QWidget*>(view);
             widget->setStyleSheet(style);
             Div* p = static_cast<Div*>(parent);
             p->addWidget(widget);
        }
        else
        {
              view = new QLineEdit(static_cast<QWidget*>(parent));
        }
        break;
    }
    case EElementType::Button: {
        if (parentType == EElementType::Div)
        {
             view = new QPushButton(text);
             QPushButton* widget = static_cast<QPushButton*>(view);
             static_cast<Div*>(parent)->addWidget(widget);
             widget->setStyleSheet(style);
        }
        else
        {
              view = new QPushButton(text,static_cast<QWidget*>(parent));
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

    QFile xmlFile("/home/student/Desktop/test.xml");
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
