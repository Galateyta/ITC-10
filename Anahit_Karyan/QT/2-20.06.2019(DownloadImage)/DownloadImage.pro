#-------------------------------------------------
#
# Project created by QtCreator 2019-06-20T21:49:02
#
#-------------------------------------------------

QT       += core gui
QT       += network
DEFINES  += QT_NO_SSL

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = DownloadImage
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp

HEADERS  += mainwindow.h

FORMS    += mainwindow.ui
