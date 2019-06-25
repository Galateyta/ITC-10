#include "mainwindow.h"
#include "ui_mainwindow.h"




EElementType elementTypeToEnum(std::string name)
{
    if ("div" == name) return  EElementType::Div;
    if ("input" == name) return  EElementType::Input;
    if ("button" == name) return  EElementType::Button;
    if ("p" == name || "span" == name || "h1" == name ||
        "h2" == name || "h3" == name || "h4" == name ||
        "h5" == name || "h6" == name ) return  EElementType::Text;


//    if ("span" == name ) return  EElementType::Span;
//    if ("h1" == name) return  EElementType::H1;
//    if ("h2" == name) return  EElementType::H2;
//    if ("h3" == name) return  EElementType::H3;
//    if ("h4" == name) return  EElementType::H4;
//    if ("h5" == name) return  EElementType::H5;
//    if ("h6" == name) return  EElementType::H6;

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
    case EElementType::Text: {//---------??? inputa sarqum inchi????
        if (parentType == EElementType::Div)
        {
             view = new QLabel(text);
            // view->setWordWrap(true);
             QWidget* widget = static_cast<QWidget*>(view);
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

             }
             Div* p = static_cast<Div*>(parent);
             p->addWidget(widget);
        }
        else
        {
            if("p" == name || "span" == name) {
                view = new QLabel(text, static_cast<QWidget*>(parent));
            } else  if("h1" == name || "h2" == name || "h3" == name || "h4" == name || "h5" == name ||"h6" == name){
                view = new QLabel(text);
               // view->setWordWrap(true);
                QWidget* widget = static_cast<QWidget*>(view);
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
                //widget->setStyleSheet();
                QWidget* p = static_cast<QWidget*>(parent);
                widget->setParent(p);
            }
        }
   }



//    case EElementType::P: {
//        if (parentType == EElementType::Div)
//        {
//             view = new QLabel(text);
//            // view->setWordWrap(true);
//             QWidget* widget = static_cast<QWidget*>(view);
//             Div* p = static_cast<Div*>(parent);
//             p->addWidget(widget);
//        }
//        else
//        {
//              view = new QLabel(text, static_cast<QWidget*>(parent));
//             // view->setWordWrap(true);
//        }
//        break;
//    }
//    case EElementType::Span: {
//        if (parentType == EElementType::Div)
//        {
//             view = new QLabel(text);
//            // view->setWordWrap(true);
//             QWidget* widget = static_cast<QWidget*>(view);
//             Div* p = static_cast<Div*>(parent);
//             p->addWidget(widget);
//        }
//        else
//        {
//              view = new QLabel(text, static_cast<QWidget*>(parent));
//             // view->setWordWrap(true);
//        }
//        break;
//    }
//    case EElementType::H1: {
//        if (parentType == EElementType::Div)
//        {
//             view = new QLabel(text);
//            // view->setWordWrap(true);
//             QWidget* widget = static_cast<QWidget*>(view);
//             QFont font = widget->font();
//             font.setPointSize(70);
//             font.setBold(true);
//             widget->setFont(font);
//             //widget->setStyleSheet();
//             Div* p = static_cast<Div*>(parent);
//             p->addWidget(widget);
//        }
//        else
//        { //----------????? ete divi mej che style chi yndunum
//              view = new QLabel(text);
//             // view->setWordWrap(true);
//              QWidget* widget = static_cast<QWidget*>(view);
//              QFont font = widget->font();
//              font.setPointSize(70);
//              font.setBold(true);
//              widget->setFont(font);
//              //widget->setStyleSheet();
//              QWidget* p = static_cast<QWidget*>(parent);
//              widget->setParent(p);
//        }
//        break;
//    }


    case EElementType::Input: {
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

    QFile xmlFile("/home/anahit/Desktop/test.xml");
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
