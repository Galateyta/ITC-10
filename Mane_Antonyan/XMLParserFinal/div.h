#ifndef DIV_H
#define DIV_H

#include <QWidget>
#include <QBoxLayout>

class Div : public QWidget
{
    Q_OBJECT
public:
    explicit Div(QWidget *parent = nullptr);
    void addLayout(QBoxLayout*);
    void addDiv(Div*);
    void addWidget(QWidget*);
    void setDirection(QBoxLayout::Direction);
    void setAlignment(Qt::Alignment);

private:
    QBoxLayout* mLayout = nullptr;
};

#endif
