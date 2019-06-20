/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.9.5
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QLabel *label;
    QPushButton *pushButtonClear;
    QPushButton *pushButtonPlusMinus;
    QPushButton *pushButtonDevide;
    QPushButton *pushButton8;
    QPushButton *pushButtonProduct;
    QPushButton *pushButton9;
    QPushButton *pushButton7;
    QPushButton *pushButton6;
    QPushButton *pushButton4;
    QPushButton *pushButton5;
    QPushButton *pushButtonPlus;
    QPushButton *pushButton3;
    QPushButton *pushButton1;
    QPushButton *pushButton2;
    QPushButton *pushButtonMinus;
    QPushButton *pushButtonPoint;
    QPushButton *pushButton0;
    QPushButton *pushButtonEqual;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QStringLiteral("MainWindow"));
        MainWindow->resize(241, 361);
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        label = new QLabel(centralWidget);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(0, 0, 241, 61));
        QFont font;
        font.setPointSize(19);
        label->setFont(font);
        label->setStyleSheet(QLatin1String("* {\n"
"	background-color:black;\n"
"	color: white;\n"
"}"));
        pushButtonClear = new QPushButton(centralWidget);
        pushButtonClear->setObjectName(QStringLiteral("pushButtonClear"));
        pushButtonClear->setGeometry(QRect(0, 60, 61, 61));
        QFont font1;
        font1.setPointSize(13);
        pushButtonClear->setFont(font1);
        pushButtonClear->setStyleSheet(QLatin1String("* {\n"
"	background-color: gray;\n"
"	color: white;\n"
"}"));
        pushButtonPlusMinus = new QPushButton(centralWidget);
        pushButtonPlusMinus->setObjectName(QStringLiteral("pushButtonPlusMinus"));
        pushButtonPlusMinus->setGeometry(QRect(60, 60, 121, 61));
        pushButtonPlusMinus->setFont(font1);
        pushButtonPlusMinus->setStyleSheet(QLatin1String("* {\n"
"	background-color: gray;\n"
"	color: white;\n"
"}"));
        pushButtonDevide = new QPushButton(centralWidget);
        pushButtonDevide->setObjectName(QStringLiteral("pushButtonDevide"));
        pushButtonDevide->setGeometry(QRect(180, 60, 61, 61));
        pushButtonDevide->setFont(font1);
        pushButtonDevide->setStyleSheet(QLatin1String("* {\n"
"	background-color: green;\n"
"	color: white;\n"
"}"));
        pushButton8 = new QPushButton(centralWidget);
        pushButton8->setObjectName(QStringLiteral("pushButton8"));
        pushButton8->setGeometry(QRect(60, 120, 61, 61));
        pushButton8->setFont(font1);
        pushButtonProduct = new QPushButton(centralWidget);
        pushButtonProduct->setObjectName(QStringLiteral("pushButtonProduct"));
        pushButtonProduct->setGeometry(QRect(180, 120, 61, 61));
        pushButtonProduct->setFont(font1);
        pushButtonProduct->setStyleSheet(QLatin1String("* {\n"
"	background-color: green;\n"
"	color: white;\n"
"}"));
        pushButton9 = new QPushButton(centralWidget);
        pushButton9->setObjectName(QStringLiteral("pushButton9"));
        pushButton9->setGeometry(QRect(120, 120, 61, 61));
        pushButton9->setFont(font1);
        pushButton7 = new QPushButton(centralWidget);
        pushButton7->setObjectName(QStringLiteral("pushButton7"));
        pushButton7->setGeometry(QRect(0, 120, 61, 61));
        pushButton7->setFont(font1);
        pushButton7->setStyleSheet(QLatin1String("* {background-color: black;	color: white;\n"
"border: 1px solid gray;}\n"
"*:pressed {background-color: gray;	color: white;\n"
"border: 1px solid gray;}\n"
"*:hover {background-color:#696969 ;	color: white;\n"
"border: 1px solid gray;}"));
        pushButton6 = new QPushButton(centralWidget);
        pushButton6->setObjectName(QStringLiteral("pushButton6"));
        pushButton6->setGeometry(QRect(120, 180, 61, 61));
        pushButton6->setFont(font1);
        pushButton4 = new QPushButton(centralWidget);
        pushButton4->setObjectName(QStringLiteral("pushButton4"));
        pushButton4->setGeometry(QRect(0, 180, 61, 61));
        pushButton4->setFont(font1);
        pushButton5 = new QPushButton(centralWidget);
        pushButton5->setObjectName(QStringLiteral("pushButton5"));
        pushButton5->setGeometry(QRect(60, 180, 61, 61));
        pushButton5->setFont(font1);
        pushButton5->setStyleSheet(QLatin1String("* {background-color: black;	color: white;\n"
"border: 1px solid gray;}\n"
"*:pressed {background-color: gray;	color: white;\n"
"border: 1px solid gray;}\n"
"*:hover {background-color:#696969 ;	color: white;\n"
"border: 1px solid gray;}"));
        pushButtonPlus = new QPushButton(centralWidget);
        pushButtonPlus->setObjectName(QStringLiteral("pushButtonPlus"));
        pushButtonPlus->setGeometry(QRect(180, 180, 61, 61));
        pushButtonPlus->setFont(font1);
        pushButtonPlus->setStyleSheet(QLatin1String("* {\n"
"	background-color: green;\n"
"	color: white;\n"
"}"));
        pushButton3 = new QPushButton(centralWidget);
        pushButton3->setObjectName(QStringLiteral("pushButton3"));
        pushButton3->setGeometry(QRect(120, 240, 61, 61));
        pushButton3->setFont(font1);
        pushButton3->setStyleSheet(QLatin1String("* {background-color: black;	color: white;\n"
"border: 1px solid gray;}\n"
"*:pressed {background-color: gray;	color: white;\n"
"border: 1px solid gray;}\n"
"*:hover {background-color:#696969 ;	color: white;\n"
"border: 1px solid gray;}"));
        pushButton1 = new QPushButton(centralWidget);
        pushButton1->setObjectName(QStringLiteral("pushButton1"));
        pushButton1->setGeometry(QRect(0, 240, 61, 61));
        pushButton1->setFont(font1);
        pushButton2 = new QPushButton(centralWidget);
        pushButton2->setObjectName(QStringLiteral("pushButton2"));
        pushButton2->setGeometry(QRect(60, 240, 61, 61));
        pushButton2->setFont(font1);
        pushButton2->setStyleSheet(QLatin1String("* {background-color: black;	color: white;\n"
"border: 1px solid gray;}\n"
"*:pressed {background-color: gray;	color: white;\n"
"border: 1px solid gray;}\n"
"*:hover {background-color:#696969 ;	color: white;\n"
"border: 1px solid gray;}"));
        pushButtonMinus = new QPushButton(centralWidget);
        pushButtonMinus->setObjectName(QStringLiteral("pushButtonMinus"));
        pushButtonMinus->setGeometry(QRect(180, 240, 61, 61));
        pushButtonMinus->setFont(font1);
        pushButtonMinus->setStyleSheet(QLatin1String("* {\n"
"	background-color: green;\n"
"	color: white;\n"
"}"));
        pushButtonPoint = new QPushButton(centralWidget);
        pushButtonPoint->setObjectName(QStringLiteral("pushButtonPoint"));
        pushButtonPoint->setGeometry(QRect(120, 300, 61, 61));
        pushButtonPoint->setFont(font1);
        pushButtonPoint->setStyleSheet(QLatin1String("* {\n"
"	background-color: gray;\n"
"	color: white;\n"
"}"));
        pushButton0 = new QPushButton(centralWidget);
        pushButton0->setObjectName(QStringLiteral("pushButton0"));
        pushButton0->setGeometry(QRect(0, 300, 121, 61));
        pushButton0->setFont(font1);
        pushButton0->setStyleSheet(QLatin1String("* {background-color: black;	color: white;\n"
"border: 1px solid gray;}\n"
"*:pressed {background-color: gray;	color: white;\n"
"border: 1px solid gray;}\n"
"*:hover {background-color:#696969 ;	color: white;\n"
"border: 1px solid gray;}"));
        pushButtonEqual = new QPushButton(centralWidget);
        pushButtonEqual->setObjectName(QStringLiteral("pushButtonEqual"));
        pushButtonEqual->setGeometry(QRect(180, 300, 61, 61));
        pushButtonEqual->setFont(font1);
        pushButtonEqual->setStyleSheet(QLatin1String("* {\n"
"	background-color: green;\n"
"	color: white;\n"
"}"));
        MainWindow->setCentralWidget(centralWidget);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "MainWindow", Q_NULLPTR));
        label->setText(QApplication::translate("MainWindow", "0", Q_NULLPTR));
        pushButtonClear->setText(QApplication::translate("MainWindow", "C", Q_NULLPTR));
        pushButtonPlusMinus->setText(QApplication::translate("MainWindow", "+/-", Q_NULLPTR));
        pushButtonDevide->setText(QApplication::translate("MainWindow", "/", Q_NULLPTR));
        pushButton8->setStyleSheet(QApplication::translate("MainWindow", "* {background-color: black;	color: white;\n"
"border: 1px solid gray;}\n"
"*:pressed {background-color: gray;	color: white;\n"
"border: 1px solid gray;}\n"
"*:hover {background-color:#696969 ;	color: white;\n"
"border: 1px solid gray;}", Q_NULLPTR));
        pushButton8->setText(QApplication::translate("MainWindow", "8", Q_NULLPTR));
        pushButtonProduct->setText(QApplication::translate("MainWindow", "*", Q_NULLPTR));
        pushButton9->setStyleSheet(QApplication::translate("MainWindow", "* {background-color: black;	color: white;\n"
"border: 1px solid gray;}\n"
"*:pressed {background-color: gray;	color: white;\n"
"border: 1px solid gray;}\n"
"*:hover {background-color:#696969 ;	color: white;\n"
"border: 1px solid gray;}", Q_NULLPTR));
        pushButton9->setText(QApplication::translate("MainWindow", "9", Q_NULLPTR));
        pushButton7->setText(QApplication::translate("MainWindow", "7", Q_NULLPTR));
        pushButton6->setStyleSheet(QApplication::translate("MainWindow", "* {background-color: black;	color: white;\n"
"border: 1px solid gray;}\n"
"*:pressed {background-color: gray;	color: white;\n"
"border: 1px solid gray;}\n"
"*:hover {background-color:#696969 ;	color: white;\n"
"border: 1px solid gray;}", Q_NULLPTR));
        pushButton6->setText(QApplication::translate("MainWindow", "6", Q_NULLPTR));
        pushButton4->setStyleSheet(QApplication::translate("MainWindow", "* {background-color: black;	color: white;\n"
"border: 1px solid gray;}\n"
"*:pressed {background-color: gray;	color: white;\n"
"border: 1px solid gray;}\n"
"*:hover {background-color:#696969 ;	color: white;\n"
"border: 1px solid gray;}", Q_NULLPTR));
        pushButton4->setText(QApplication::translate("MainWindow", "4", Q_NULLPTR));
        pushButton5->setText(QApplication::translate("MainWindow", "5", Q_NULLPTR));
        pushButtonPlus->setText(QApplication::translate("MainWindow", "+", Q_NULLPTR));
        pushButton3->setText(QApplication::translate("MainWindow", "3", Q_NULLPTR));
        pushButton1->setStyleSheet(QApplication::translate("MainWindow", "* {background-color: black;	color: white;\n"
"border: 1px solid gray;}\n"
"*:pressed {background-color: gray;	color: white;\n"
"border: 1px solid gray;}\n"
"*:hover {background-color:#696969 ;	color: white;\n"
"border: 1px solid gray;}", Q_NULLPTR));
        pushButton1->setText(QApplication::translate("MainWindow", "1", Q_NULLPTR));
        pushButton2->setText(QApplication::translate("MainWindow", "2", Q_NULLPTR));
        pushButtonMinus->setText(QApplication::translate("MainWindow", "-", Q_NULLPTR));
        pushButtonPoint->setText(QApplication::translate("MainWindow", ".", Q_NULLPTR));
        pushButton0->setText(QApplication::translate("MainWindow", "0", Q_NULLPTR));
        pushButtonEqual->setText(QApplication::translate("MainWindow", "=", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
