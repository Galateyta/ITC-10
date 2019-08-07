#ifndef DIV_H
#define DIV_H

#include <QBoxLayout>
#include <QWidget>

class Div : public QWidget
{
    Q_OBJECT
public:
    explicit Div(QWidget *parent = nullptr);

public:
    void addLayout(QBoxLayout* layout);
    void addDiv(Div* div);
    void addWidget(QWidget* widget);
    void setDirection(QBoxLayout::Direction direction);
    void setAlignment(Qt::Alignment alignment);

private:
    QBoxLayout* mLayout = nullptr;
};

#endif // DIV_H
